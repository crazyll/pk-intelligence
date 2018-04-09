export function logError(sev, msg){
    var img = new Image();
    img.src = '/logerrors?sev='+encodeURIComponent(sev)
    +'&msg='+encodeURIComponent(msg);
}

 