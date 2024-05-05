class UnixPhoto extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const width = this.getAttribute('width');
        this.innerHTML = `
            <img src="public/img/unix.png" id="prof-pic" width="${width}" class="rounded-full shadow-xl shadow-gray-400 dark:shadow-[#1A1819]" alt="Unix's photo" />
        `;
    }
}

customElements.define('unix-photo', UnixPhoto);


class UnixPhotoSMall extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <img src="../../public/img/unix.png" width="50px" class="rounded-full" alt="Unix's photo" />
        `;
    }
}

customElements.define('unix-photo-small', UnixPhotoSMall);