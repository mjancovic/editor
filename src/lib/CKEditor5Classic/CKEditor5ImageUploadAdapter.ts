export default class ImageUploadAdapter {
    private readonly loader: any;
    private xhr: any;
    private readonly insertImageServiceUrl: string;
    private readonly getImageServiceUrl: string;
    constructor(loader: any, insertImageServiceUrl: string, getImageServiceUrl: string) {
        this.loader = loader;
        this.insertImageServiceUrl = insertImageServiceUrl;
        this.getImageServiceUrl = getImageServiceUrl;
    }

    upload(): any {
        return this.loader.file
            .then((file: any) => new Promise((resolve, reject) => {
                this._initRequest(file);
                this._initListeners(resolve, reject, file);
                this._sendRequest(file);
            }));
    }

    abort(): void {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    _initRequest(file: { name: string | number | boolean; size: string; type: any; }): void {
        const xhr = this.xhr = new XMLHttpRequest();

        let uploadUrl = this.insertImageServiceUrl;
        uploadUrl += '&dADFileUpload=Y';
        uploadUrl += '&max_file_size=0';
        uploadUrl += '&name=' + window.btoa(encodeURIComponent(file.name));
        uploadUrl += '&size=' + file.size;
        uploadUrl += '&type=' + (file.type ? file.type : 'n/a');
        xhr.open('POST', uploadUrl, true);
        xhr.responseType = 'json';
    }

    _initListeners(resolve: { (value: unknown): void; (arg0: { default: string; }): void; }, reject: { (reason?: any): void; (arg0: string | undefined): void; }, file: { name: any; }): void {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            if (response && response.S) {
                if (response.S === 'Y') {
                    const fileId = this._getFileIdFromResponse(response);
                    if (fileId) {
                        resolve({
                            default: this.getImageServiceUrl + '?view=Y&file=' + fileId
                        });
                        return;
                    }
                } else if (response.M) {
                    reject(response.M);
                    return;
                }
            }
            reject(genericErrorText);
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', (evt: { lengthComputable: any; total: any; loaded: any; }): void => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    _sendRequest(file: string | any[]): void {
        this.xhr.send(file.slice());
    }

    _getFileIdFromResponse(response: { F: any; }): string | null {
        if (response.F && Array.isArray(response.F)) {
            for (const field of response.F) {
                if (Array.isArray(field) && field.length > 1 && field[0] === 'id')
                    return field[1];
            }
        }
        return null;
    }
}