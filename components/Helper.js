import global from '/styles/global.module.css';

const CheckInputValid = () => {
    let error = document.querySelectorAll(`.${global.error}`);

    let result = true;

    for (const item of error) {
        if (item.innerHTML !== '') {
            result = false;
            break;
        }
    }

    return result;
}

const cx = (...className) => {
    return [...className].join(' ');
}

const InputFormatAlphabet = (event) => {
    event.target.value = event.target.value.replace(/[^.a-zA-Z ]/g, '');
}

const InputFormatNumber = (event) => {
    event.target.value = event.target.value.replace(/[^.0-9]/g, '').replace(/(\..*?)\..*/g, '0.');
}

const SetPriceFormat = (harga = 0) => {
    if (harga == '0' || harga == '' || harga == null || harga == undefined) return `0`;

    let price = harga.toString().split('.');
    let reverse = price[0].toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(',').split('').reverse().join('');

    if (harga < 0) {
        if (price.length > 1) return `-${ribuan}.${price[1]}`;
        else return `-${ribuan}`;
    } else {
        if (price.length > 1) return `${ribuan}.${price[1]}`;
        else return ribuan;
    }
}

export { CheckInputValid, cx, InputFormatAlphabet, InputFormatNumber, SetPriceFormat };