const output = function (status, data, msg) {
	return JSON.stringify({status: status, data: data, msg: msg})
}

module.exports = {
  output: output
}