function isEmpty(row){
	var result = true;
	if(!row){
		return true;
	}
	row.forEach(function(col){
		if(col !== null && col !== undefined && col.length > 0){
		result = false;
		}
	})
	return result;
}

function objToArray(o){
	if(!o || o.length === 0){
		return [];
	}
	var header = [];
	
	var result = [];
	
	o.forEach(function(item, index){
		if(index === 0){
		header = Object.keys(item);
		result.push(header);
		}
		var row = [];
		header.forEach(function(key, indexCol){
		row[indexCol] = item[key];
		})
		result.push(row);
	})
	return result;
}


function arrayToObj(rows){
	var data = [];
	var keys = [];
	
	rows.filter(function(row){
		return !isEmpty(row);
	}).forEach(function(row, index){
		if(index === 0){
		keys = row.filter(function(item){
			return item !== null;
		});
		}else{
		var dataRow = {};
		keys.forEach(function(key, colIndex){
			dataRow[key] = row[colIndex];
		})
		data.push(dataRow);
		}
	})
	return data;
};

module.exports = {
	objToArray: objToArray,
	arrayToObj: arrayToObj
}