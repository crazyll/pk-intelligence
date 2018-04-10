export default {
    // 深度拷贝
    deepCopy(dist, obj){
        dist = obj.constructor === Array ? []:dist
        for(let i in obj){
            if(typeof obj[i] === 'object' && obj.hashOwnProperty(i)){
                dist[i] = this.deepCopy(dist, obj)
            } else {
                dist[i] = obj[i]
            }
        }
        return dist
    },
}