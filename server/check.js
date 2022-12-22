/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

function check_string(str, var_name , func_name){
    if(!str || typeof str !== 'string'){
        throw `${func_name} Error: ${var_name} is not a string`;
    }
    str = str.trim();
    if(str.length === 0 ){
        throw `${func_name} Error: ${var_name} cannot be an empty string`;
    }
    return str
}

function check_num(num, var_name , func_name){
    if(num === 0){
        return num;
    }
    if(!num || typeof num !== 'number'){
        throw `${func_name} Error: ${var_name} is not a number`;
    }
    if(isNaN(num)){
        throw `${func_name} Error: ${var_name} is not a number`;
    }
    if(!Number.isInteger(num) || num < 0 ){
        throw `${func_name} Error: ${var_name} must be a positive integer`;
    } 
    return num;
}

function check_page(pageNum, total, limit, var_name, func_name){
    if(Math.ceil(total/limit) <= pageNum){
        throw`${func_name} Error: ${var_name} is not a valid page`;
    }
    return pageNum;
}

module.exports = {
    check_string, 
    check_num, 
    check_page
}