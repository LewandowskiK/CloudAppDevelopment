import { Component, OnInit } from '@angular/core';
import { Storage } from "@aws-amplify/storage"
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  

  fileToUpload: File | null = null

  adminUser: boolean = false

  downloadLinks = []
  fileNames = []

  handleFileInput(files: FileList){
    this.fileToUpload = files.item(0)
  }

  uploadFile = async ()=>{
    console.log("Uploading file")
    let result = await Storage.put(this.fileToUpload.name,this.fileToUpload, {contentType:this.fileToUpload.type})
    window.alert("File Uploaded Successfully");
    console.log(result)
    window.location.reload()
  }

  async ngOnInit() {
    this.downloadLinks = []
    this.fileNames = []
    let user =  await Auth.currentAuthenticatedUser()

    let groups = user.signInUserSession.accessToken.payload["cognito:groups"]

    if(groups.includes("Admins")){
      this.adminUser = true
      console.log("Admin user logged in")

      const objects = await Storage.list("")

      objects.results.map(async (item)=>{
        if(item.key != ''){
          this.getFileLink(item.key)
        }
      })
    }
  }

  async getFileLink(filename){
    let result = await Storage.get(filename, {download: true})
    this.downloadBlob(result.Body as Blob,filename)
  }
  
  async downloadBlob(blob:Blob,filename){
    let url = URL.createObjectURL(blob)
    this.downloadLinks.push(url)
    this.fileNames.push(filename)
  }




  // ########Upload
  // await Storage.put("test.txt", "Hello")
  // ########Download
  // await Storage.get('test.txt', { 
  // level: 'public'
  // });
  // ########List
  // Storage.list('photos/') // for listing ALL files without prefix, pass '' instead
  //         .then(result => console.log(result))
  //         .catch(err => console.log(err));
  // ########Delete
  // Storage.remove('test.txt');
}




