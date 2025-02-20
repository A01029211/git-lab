// En este codigo se encuentran muchas funciones las cuales fueron creadas con el proposito de practicar el lenguaje JavaSript
// Santiago Cordova Molina A01029211
// 2/12/2025

"use strict";

// Esta funcion encuentra el primer carácter de un cadena de texto que no se repite. 

export function firstNonRepeating(string) 
{
    for(let i=0; i<string.length; i++ ) 
    {
        let repeated = false;
        for(let j=0; j<string.length; j++)
        {
            if(string[i] == string[j] && i != j)
            {
                repeated = true;
                break;
            }
        }
        console.log(`Char: ${string[i]}, repeated: ${repeated}`); 
        if (!repeated)
        {
            return string[i];
        }
        
    }
    
}

console.log(firstNonRepeating("abacddbec"));



// Acomoda un arrelgo de numeros en orden con el metodo de bubble sort 

export function bubbleSort(sequence){
    for( let i=0;  i < sequence.length; i++){
        for( let j=0; j < (sequence.length -1) ; j++ ){
            if(sequence[j]>sequence[j+1]){
                let aux = 0;
                aux = sequence[j]; 
                sequence[j] = sequence[j+1]; 
                sequence[j+1] = aux; 
            }
        }
    }
    return sequence;
}

console.log(bubbleSort([7,18,1,24,2,3,59]));

//3 invierte un arreglo de numeros, invert array crea un nuevo arreglo donde se ponen los numeros en orden invertido y invertarreyinplace cambia los numeros de ese mismo arreglo 
export function invertArray (list){
    let newList =[];
    for (let i = list.length - 1; i >= 0; i--) {  
        newList.push(list[i]);
    }
    return newList;
}

export function invertArrayInplace(list){
    for(let i = 0; i < (list.length / 2); i++){
        let j = list.length -1 -i;
        let aux = list[i]; 
        list[i] = list[j]; 
        list[j] = aux;
}
return list;
}

console.log(invertArray([1,2,3,4,5,6]));
console.log(invertArrayInplace([1,2,3,4,5,6]));

//4 Esta funcion hace que la primera letra de cada palabra se vuelva una letra capital

export function capitalize(string){
    let newString = ""
    for(let i=0; i<string.length; i++){
        if(i == 0 || string[i-1] == " "){
            newString+= string[i].toUpperCase();
        }
        else{
            newString+= string[i];
        }
    }
    return newString;
}

console.log(capitalize("hola mi nombre es santiago"));

//5 Esta funcion encuentra el maximo comun denominador 
export function mcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

console.log(mcd(56,98));

//6 Esta fucnion cambia un string a hackerspeak. Logra esto cambiando algunas palabras por numeros
export function hackerSpeak(string) {
    let newString = "";
    for (let i = 0; i < string.length; i++) {    
        newString += traduccion(string[i]); 
    }
    return newString;
}

export function traduccion(letra) {
    switch (letra) {
        case "a": case "A":
            return "4";

        case "i": case "I":
            return "1";

        case "s": case "S":
            return "5";

        case "e": case "E":
            return "3";

        case "b": case "B":
            return "8";

        case "o": case "O":
            return "0";

        case "z": case "Z":
            return "2";

        default:
            return letra;
    }
}


console.log(hackerSpeak("Antonio Cordova")); 
console.log(hackerSpeak("Javascript es divertido"));

//7 Esta funcion te muestra todos los numeros de la factorizacion de un numero
export function factorize(num){
    let numList=[];
    for(let i=1; i<= num; i++){
        if(num % i == 0){
            numList.push(i);
        }
    }
    return numList;
}

console.log(factorize(12));

//8 Esta funcion quita los elementos duplicados de un arreglo y regrese una lista con los elementos que quedan. 
export function deduplicate(list) {
    let newList = [];
    
    for (let i = 0; i < list.length; i++) {
        if (newList.indexOf(list[i]) == -1) {
            newList.push(list[i]);
        }
    }
    
    return newList;
}

console.log(deduplicate([1,2,5,1,2,1,5]));
console.log(deduplicate([4,9,8,1,4,9,5,6,7,7]));

//9 recibe como parámetro una lista de cadenas de texto, y regrese la longitud de la cadena más corta.
export function findShortestString(strings) {
    if (strings.length == 0) return 0; 
    
    let min = strings[0].length;
    
    for (let i = 1; i < strings.length; i++) {
        if (strings[i].length < min) {
            min = strings[i].length;
        }
    }

    return min;
}


console.log(findShortestString(["hola", "hoy","es", "martes"])); 

//10 Esta funcion revisa si una cadena de texto es un palíndromo o no.
export function isPalindrome(string){
    let palindromo = true;
    for(let i = 0; i < (string.length / 2); i++){
        let j = string.length -1 -i;
        if (string[i] != string [j]){
            palindromo = false;
        }
    }
    if(palindromo == false){
        console.log("No es palindromo");
        return false;
    }
    else{
        console.log("Es palindromo");
        return true;
    }
}

console.log(isPalindrome("reconocer"));

//11 Esta funcion toma una lista de cadena de textos y devuelva una nueva lista con todas las cadenas en orden alfabético.
export function sortStrings(list){
    for(let i = 0; i < list.length - 1; i++)
        {
            let minimo = i;
            for(let j = i + 1; j < list.length; j++) 
            {
                if (list[j] < list[minimo]) 
                {
                    minimo = j; 
                }
            
            }
                let aux = list[i]; 
                list[i] = list[minimo]; 
                list[minimo] = aux; 
        }
        return list;
}

console.log(sortStrings(["hola", "mundo", "mi", "nombre", "es", "santiago"]));


//12 Esta funcion toma una lista de números y devuelva una lista con dos elementos: promedio y la moda.
export function stats(numList = []) {  
    if (numList.length == 0) {
        return [0,0]; 
    }
    let result = [];
    result.push(mean(numList)); // implementa el metodo mean
    result.push(mode(numList)); // implementa el metodo mode
    return result;
}

export function mean(numList){
    if (numList.length == 0) return null;
    let cont =0 ;
    for(let i=0; i<numList.length; i++){
        cont += numList[i];
    }
    let result = cont / numList.length;
    return result;
}

export function mode(numList){
    if (numList.length == 0) return null;
   let moda = null;
   let max = 0;

   for(let i =0; i<numList.length; i++){
    let contador = 0;

    for (let j = 0; j<numList.length;j++){
        if (numList[i]==numList[j]){
            contador++;
        }
    }
    if (contador > max){
        max = contador;
        moda = numList[i];
    }
   }
   return moda;
}

console.log(stats([8, 4, 2, 6, 8, 13, 17, 2, 4, 8,]));
console.log(stats());

//13 Esta funcion toma una lista de cadenas de texto y devuelva la cadena más frecuente.
export function popularString(list){
    if (list.length === 0) {
        return "";  
    }
    
    let popular = null;
    let max = 0;
 
    for(let i =0; i<list.length; i++){
     let contador = 0;
 
     for (let j = 0; j<list.length;j++){
         if (list[i]==list[j]){
             contador++;
         }
     }
     if (contador > max){
         max = contador;
         popular = list[i];
     }
    }
    return popular;

}

console.log(popularString(["hola","mundo", "me", "llamo", "mundo"]));

//14 Esta funcion toma un número y devuelva verdadero si es una potencia de dos, falso de lo contrario.
export function isPowerOf2(num){
    if(num == 1)
        return true;

    else if (1 >num)
        return false;

    return isPowerOf2(num / 2);
}

console.log(isPowerOf2(128));
console.log(isPowerOf2(55));

//15 Esta funcion toma una lista de números y devuelva una nueva lista con todos los números en orden descendente. 
export function sortDescending(list){
    for(let i = 0; i < list.length; i++)
        {
            let maximo = i;
            for(let j = i + 1; j < list.length; j++) 
            {
                if (list[j] > list[maximo]) 
                {
                    maximo = j; 
                }
            }
            
            let aux = list[i]; 
            list[i] = list[maximo]; 
            list[maximo] = aux; 
        }
        return list;
    }

console.log(sortDescending(["hola", "mundo", "como","estas","hoy"]));
