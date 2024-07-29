const { pool } = require('../db/connection')



async function createBlog(reqBody,user) {
  try{
    const client = await pool.connect();
    const { title, body, image, slug,service,ispublished } = reqBody;
    let query = `
    INSERT INTO blogs
    (version, created_by,title,service,body,image,slug,ispublished)
    VALUES(1,${user.id},'${title}','${service}','${body}','${image}','${slug}',${ispublished})
    `;
    console.log('query', query)
    const {rows} = await client.query(query);
    console.log('query', rows)
    client.release();
    if(rows[0]){
      return rows[0]
    }
    return {};
  }catch(e){
    console.log("error in creating blog",e);
    return {};
  }
    
}

async function updateBlog(id, data,user) {
  try{
    const client = await pool.connect();
    const { title, body, image, slug,service,ispublished } = data;
    let query = `
    Update blogs
    
    updated_by=${user.id},title='${title}',updated_time=timezone(\'utc\'::text, now()),service='${service}',body='${body}',image='${image}',slug='${slug}',ispublished=${ispublished}
    where id=${id}
    `;

    const {rows} = await client.query(query);
    client.release();
    if(rows[0]){
      return rows[0];
    }
    return {};
  }catch(e){
    console.log("error in updating blog",e);
    return {};
  }
}

async function deleteBlog(id) {
  try{
    const client = await pool.connect();
    let query = `
      update blog 
      set isdeleted=true
      where id = ${id}
    `;
    const {rows} = await client.query(query);
    client.release();
    if(rows[0]){
      return rows[0]
    }
    return {};
  }catch(e){
    console.log("error in delete blogs service",e);
    return {};
  }
}

async function getBlogsByUser(user) {
  try{
    const client = await pool.connect();
    let query = `
      select title,image,service,body,creation_time,slug,updated_time,ispublished
      from blogs
      where created_by=${user.id} and isdeleted=false
    `;
    const {rows} = await client.query(query);
    client.release();
    if(rows[0]){
      return rows[0]
    }
    return [];
  }catch(e){
    console.log("error in get blogs service",e);
    throw e;
  }
}
async function getById(id) {
  try{
    const client = await pool.connect();
    let query = `
      select title,image,service,body,creation_time,slug,updated_time,ispublished
      from blogs
      where id=${id} and isdeleted=false
    `;
    const {rows} = await client.query(query);
    client.release();
    if(rows[0]){
      return rows[0];
    }
    return {};
  }catch(e){
    console.log("error in get blog service",e);
    throw e;
  }
}

async function searchByTitle(title) {
  try{
    const client = await pool.connect();
    let query = `
      select title,image,service,,creation_by,slug,
      from blogs
      where title=${title}
    `;
    const {rows} = await client.query(query);
    if(rows[0]){
      return rows[0]
    }
    client.release();
    return [];
  }catch(e){
    console.log("error in searching blogs service",e);
    return [];
  }}

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByUser,
  searchByTitle,
  getById
};
