import {toast} from "react-toastify"

export const succesToastView = (data: string) => { 
    toast.success(data, {
        style: { backgroundColor: 'white', color: 'blue' },
        pauseOnHover: false,
        autoClose: 1500
      });
}

export const errorToastView = (data: string) => { 
    toast.error(data, {
        style: { backgroundColor: 'white', color: 'red' },
        pauseOnHover: false,
        autoClose: 2500
      });
}