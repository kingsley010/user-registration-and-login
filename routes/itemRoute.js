import express from 'express';
import ItemController from '../controllers/itemController';
const router = express.Router();

router.get('/items', ItemController.getItems);
router.get('/items/:id', ItemController.getOneItem)
router.post('/items', ItemController.addItem);
router.post('/items/:id', ItemController.editItem)
router.delete('/items/:id', ItemController.deleteItem)

export default router;


// import React from 'react';
// import { CSSTransition } from 'react-transition-group';
// const MyComponent = () => {
//     const nodeRef= React.useRef(null)
//     return (
//         <CSSTransition nodeRef={nodeRef} in timeout={200} classNames="fade">
//             <div ref={nodeRef}>Fade</div>
//         </CSSTransition>
//     )
// }