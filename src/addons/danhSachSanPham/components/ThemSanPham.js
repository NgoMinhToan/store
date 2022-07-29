import React, { useState, useRef, useEffect } from 'react'
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import { useDispatch } from 'react-redux';
import * as Actions from '../../../actionTypes'

const ThemSanPham = ({ hide }) => {
    const uploader = new Uploader({
        apiKey: "free"
    });
    const [imgUrl, setImgUrl] = useState('');
    const titleRef = useRef(null);
    const priceRef = useRef(null);
    const taxRef = useRef(null);
    const descRef = useRef(null);
    const imageRef = useRef(null);
    const dispatch = useDispatch();

    const createProduct = () => {
        let error = 0;
        if (titleRef.current.value === '') {
            titleRef.current.parentElement.classList.add('alert')
            error++;
        }
        if (priceRef.current.value === '' || priceRef.current.value < 0) {
            priceRef.current.parentElement.classList.add('alert')
            error++;
        }
        if (+taxRef.current.value >= +priceRef.current.value || +taxRef.current.value < 0) {
            taxRef.current.parentElement.classList.add('alert')
            error++;
        }
        if(imgUrl===''){
            imageRef.current.classList.add('alert')
            error++;
        }
        if (error === 0) {
            console.log('create product')
            dispatch({type: Actions.CREATE_PRODUCT, payload: {
                title: titleRef.current.value,
                price: Number(priceRef.current.value),
                tax: Number(taxRef.current.value),
                image: imgUrl,
                description: descRef.current.value || '',
                category: 'User Add',
                rating: {
                    rate: 3.9,
                    count: 120
                },
            }})
            hide()
        }
    }
    const onNameChange = (e) => {
        titleRef.current.parentElement.classList.remove('alert')
    }
    const onPriceChange = (e) => {
        priceRef.current.parentElement.classList.remove('alert')
    }
    const onTaxChange = (e) => {
        taxRef.current.parentElement.classList.remove('alert')
    }
    useEffect(() => {
        imageRef.current.classList.remove('alert')
    }, [imgUrl])

    return (
    <div className='input-item page-add-product'>
        <h1 className='title-page'>Thêm sản phẩm</h1>
        <div className="input-item title-input">
            <label htmlFor="title">Tên sản phẩm: </label>
            <input onChange={onNameChange} ref={titleRef} type="text" name="title" id="" required/>
        </div>

        <div className="input-item price-input">
            <label htmlFor="price">Giá sẳn phẩm: </label>
            <input onChange={onPriceChange} ref={priceRef} type="number" name="price" id="" required min={1}/>
        </div>

        <div className="input-item tax-input">
            <label htmlFor="tax">Thuế: </label>
            <input onChange={onTaxChange} ref={taxRef} type="number" name="tax" id="" required min={1} />
        </div>

        <div className="input-item image-input" ref={imageRef}>
            <label htmlFor="image">Ảnh sản phẩm: </label>

            <UploadButton uploader={uploader}
                options={{multi: false, mimeTypes: ["image/jpeg", "image/png", "image/webp"], editor: {'images': {crop: true, cropShape: 'rectangle', cropRatio: 1}}}}
                onComplete={files => {
                    if (files.length > 0) {
                        console.log(files[0].fileUrl);
                        setImgUrl(files[0].fileUrl);
                    }
                }}>
                {({onClick}) =>
                    <button className='input-img-btn' onClick={onClick}>
                    {imgUrl!='' ? imgUrl : 'Upload a file...'}
                    </button>
                }
            </UploadButton>  
        </div>

        <div className="input-item submit">
            <button onClick={createProduct} className='create-btn' type="submit">Create</button>
        </div>
        <div className="input-item description-input">
            <label htmlFor="title">Mô tả: </label>
            <textarea onChange={onNameChange} ref={descRef} type="text" name="title" id="" required/>
        </div>

        {imgUrl && 
        <div className="input-item img-view">
            <img src={imgUrl} alt="" />
        </div> 
        }


    </div>
  )
}

export default ThemSanPham