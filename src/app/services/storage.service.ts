import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage = inject(Storage);

  async uploadDocument(file: File, certId: string): Promise<string> {

    const fileRef = ref(
      this.storage,
      `certificates/${certId}/${file.name}`
    );

    await uploadBytes(fileRef, file);

    return getDownloadURL(fileRef);

  }

}
