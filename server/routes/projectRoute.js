const express = require('express')
const  projectController = require('../controllers/projectController')
const pjcontroller = require('../controllers/freelance_proj')
const router = express.Router()
const cors = require("cors")

router.use(cors())
router.use(express.json())

router.get              ('/test',(req,res)=>{
    res.status(200).json({
        message:"Tesst Success"
    })
})

router.post('/create',projectController.create_project1)
router.post('/getall',projectController.get_projects)
router.post('/assigned',projectController.get_assigned_proj)
router.post('/unassigned',projectController.get_unassigned)
router.post('/all',pjcontroller.get_all_proj)
router.post('/getwid', projectController.get_with_id )    
router.post('/assign',projectController.project_update)
router.post('/rtun',projectController.return_freelance  )
router.post('/rmf', projectController.remove_freelance          )


module.exports=router;