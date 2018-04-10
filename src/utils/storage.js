
export default {
    get(){
        if(typeof localStorage === 'object'){
            return localStorage;
        } else {
            throw new Error('Local storage is not available.')
        }
    },
    
    store(module ,obj){
        localStorage[module] = JSON.stringify(obj)
    }
}
