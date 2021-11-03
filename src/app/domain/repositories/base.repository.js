'use strict';

const mssql = require('mssql');
const Exception = require('../../exceptions/exception');
const array_util = require('../../utils/arrayUtil');

/**
 * @author Matheus Mol
 */

/**
 * Camada de acesso a banco de dados
 */
module.exports = class BaseRepository {
	constructor(debug = false) {
		this.debug = debug;
	}

	/**
	 * Validation pagination parameter
	 *
	 * @param {{page:number, rows:number}} params Pagination parameters
	 * @returns {{page:number, rows:number}}
	 */
	toParamsPagination(params) {
		if (this.toParamValue(params.page, false) == false) return null;

		const pagination = {
			page: this.toParamValue(params.page),
			rows: this.toParamValue(params.rows),
		};
		return pagination;
	}

	/**
	 * Check array has data
	 */
	isResultEmpty(result) {
		return array_util.isEmpty(result);
	}

	/**
	 * Get first object of array
	 */
	toFirst(result, model) {
		const value = array_util.toFirst(result);
		if (model) {
			return model.toModel(value);
		}
		return value;
	}

	/**
	 * Alterar o response para o modelo
	 * @param {array} result
	 * @param {*} model Modelo
	 * @returns {any} Array
	 */
	getResponse(result, model) {
		if (this.debug) {
			console.log(result);
		}
		if (this.isResultEmpty(result)) {
			return [];
		}
		const results = array_util.toArray(result);
		if (model) {
			return results.map(i => model.toModel(i));
		}
		return results;
	}

	/**
	 * Alterar o response para o modelo com a chave results: []
	 * @param {array} result
	 * @param {*} model Modelo
	 * @returns {Array} Array
	 */
	getResponseResults(result, model) {
		if (this.isResultEmpty(result)) {
			return { results: [] };
		}
		let results = array_util.toArray(result);
		if (model) {
			let mapper = results.map(i => model.toModel(i));
			results = mapper;
		}
		return { results };
	}

	// Accepts the array and key (string)
	groupBy(array, key) {
		// Return the end result
		return array.reduce((result, currentValue) => {
			// If an array already present for key, push it to the array. Else create an array and push the object
			(result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
			// Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
			return result;
		}, {}); // empty object is the initial value for result object
	}

	/**
	 * Drop temp table
	 * @param {mssql.ConnectionPool} conn Conexão sql server
	 * @param {String} tableName Nome da tabela
	 */
	async dropTempTable(conn, tableName) {
		try {
			const batchSql = `IF OBJECT_ID('tempdb..${tableName}') IS NOT NULL
                            DROP TABLE ${tableName}
                          `;
			await conn.request().batch(batchSql);
		} catch (error) {
			console.error(error.message);
		}
	}

	/**
	 * Identifica e lança a exceção
	 */
	handleError(err, sqlType, methodName) {
		if (this.debug) {
			console.log(err);
		}
		if (err instanceof mssql.RequestError && sqlType && methodName) {
			throw new Exception(
				`${sqlType}:base_repository.${methodName}; msg:${err.message};code:${err.code}`,
			);
		}

		if (err instanceof mssql.RequestError || err.class) {
			throw new Exception(err.message);
		}

		if (!(err instanceof Exception)) {
			throw new Exception(err);
		}
		throw err;
	}
};
