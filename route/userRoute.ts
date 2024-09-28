import express, {Router} from 'express';
import { register, login } from '../controller/userController';

const router: Router = express.Router();

router.post('/register',  (req,res)=>{
    register(req, res);
});
router.post('/login', (req,res)=>{
    login(req, res);
});

export default router;
