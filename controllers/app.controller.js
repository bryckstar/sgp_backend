const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'sgp',

});

const getProjects = async(req, res) => {
    const response = await pool.query('SELECT * FROM sgp.projects');
    res.status(200).json(response.rows);
};


const createProjects = async(req, res) => {
const { title, state, description, _id_lider, timeframe__id, subcategory__id, subcategory_category__id , project_id, period_id} = req.body;
    const response = await pool.query('with ins As( INSERT INTO sgp.projects  (title, state, description, _id_lider, timeframe__id,\
        subcategory__id, subcategory_category__id) VALUES ($1, $2, $3, $4, $5, $6, $7))'+'\
        insert into sgp.projects_period (period__id,projects__id) select p._id, c._id from sgp.period p left join lateral (select _id from sgp.projects where _id = $8) c on true where  p._id = $9;',[title, state, description, _id_lider, timeframe__id, subcategory__id, subcategory_category__id, project_id, period_id]);
    console.log(response);
    res.send('Project Created');
}

const getProjectsById = async(req, res) =>{
    const id = req.params.id;
    const response = await pool.query('SELECT ' +'* FROM sgp.projects WHERE _id = $1', [id]);
    res.json(response.rows);
}

const deleteProject = async(req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM sgp.projects WHERE _id = $1',[id]);
    console.log(response);
    res.json(`Proyecto ${id} eliminado correctamente`);
}

const updateProject = async(req, res) =>{
    const id = req.params.id;
    const {title, state, description, _id_lider} = req.body;
    const response = await pool.query("UPDATE sgp.projects SET title = $1, state = $2, description = $3, _id_lider = $4 WHERE _id = $5 ", [
        title,
        state,
        description,
        _id_lider,
        id
    ]);
    console.log(response);
    res.json('Proyecto actualizado');
}


module.exports = {
    getProjects,
    createProjects,
    getProjectsById,
    deleteProject,
    updateProject
};