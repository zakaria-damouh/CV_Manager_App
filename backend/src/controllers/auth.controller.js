import { loginService, registerService } from "../services/auth.service.js";


export const register = async (req, res) =>{
    try{
        const { firstName, lastName, email, password } = req.body;
        const user = await registerService(firstName, lastName, email, password);
        res.status(201).json({message: 'User created successfully' , user});
    }catch(err){
        res.status(400).json({message : err.message});
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};