/* 
   XY-dni-Z

   20-34542345-3

   20345423453
*/
const dni=document.getElementById('dni')
const cuil=document.getElementById('cuil')   
const copy=document.getElementById('copy')   
const re=/^\d+$/

function checksum(X,Y,dni){
        const digits=[X,Y].concat(dni).reverse()
        const vector=[2,3,4,5,6,7,2,3,4,5]
        let Z=0
        let j=0
        for(i=0;i<digits.length;i++){
            Z+=digits[i]*vector[i]
        }
        Z%=11
        Z=11-Z
        return Z
}

function performCuil(dni,sex){
        let X=2
        let Y=({'F':7,'M':0})[sex]
        const _dni=dni.split("").map(x => parseInt(x))
        let Z=checksum(X,Y,_dni)

        if(Z === 1){
            Y=3
            Z=({'M':9,'F':4})[sex]
        
        }else if(Z >= 10){
            Y=3
            Z=checksum(X,Y,_dni)
        }
        return  [X,Y].concat(_dni).concat([Z]) 
}

function formatCuil(cuil){
    const compact=document.getElementById('compact')
    if(!compact.checked) 
        return cuil.join("")

    return cuil.slice(0,2).join("")+"-"+cuil.slice(2,10).join("")+"-"+cuil[10]
}


function updateCuil(){
    const sex=document.querySelector('input[name="sex"]:checked')
    if(!dni.value || dni.value.length<7 || !re.test(dni.value) ){
        cuil.value=""
        dni.setCustomValidity("DNI no válido.")
        return;
    }
    dni.setCustomValidity("")
    const rawCuil=performCuil(dni.value,sex.value)
    cuil.value=formatCuil(rawCuil)
}

copy.addEventListener('click',function(e) {
    e.preventDefault()
    cuil.focus()
    cuil.select()
    document.execCommand('copy')
})

dni.addEventListener('focus',function(e){
    cuil.value=""
})

addEventListener('change',updateCuil)

addEventListener('submit',function(e){
    e.preventDefault()
    updateCuil()
})
