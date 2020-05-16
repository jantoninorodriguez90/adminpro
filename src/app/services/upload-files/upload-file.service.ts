import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { XhrFactory } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file:File, type:string, id:string){
    
    return new Promise( (resolve, reject) => {

      let formdata = new FormData();
      let xhr = new XMLHttpRequest();
  
      formdata.append('imagen', file, file.name);
  
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            console.log('archivo subido');
            resolve(JSON.parse(xhr.response));
          }else{
            console.log('fallo la subida');
            reject(xhr.response);
          }
        }
      };

      let url = URL_SERVICES + '/upload/'+type+'/'+id;
      xhr.open('PUT', url, true);
      xhr.send(formdata);

    });
    
  }

}
