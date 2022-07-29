import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Actions from '../../../actionTypes'
import Header from './Header'
import Footer from './Footer'

import Modal from './Modal'
import useModal from './useModal'

const Layout = () => {
    const dispatch = useDispatch()
    const { isShowing, toggle } = useModal()

    useEffect(() => {
        dispatch({type: Actions.LOAD_PRODUCT_DATA})
        // const closePage = (e) => {
        //   console.log('close page')
        //   return ''
        // }

        // window.onbeforeunload = function() {
        //   console.log('close page')
        //   return '';
        // };

        // window.addEventListener("beforeunload", closePage, {capture: true});
        // return () => window.removeEventListener("beforeunload", closePage, {capture: true});
      }, [])

    return (
      <div className="">
        <Header toggleModal={toggle} />
        <div className='body'>
          <div className="main">
            <Outlet />
          </div>
        </div>
        <Footer />
        <Modal isShowing={isShowing} hide={toggle} />
      </div>
    )
}

export default Layout