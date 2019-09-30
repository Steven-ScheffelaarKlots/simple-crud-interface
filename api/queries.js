const Pool = require('pg').Pool
const pool = new Pool({
  user: 'welltok',
  host: 'localhost',
  database: 'welltok',
  password: 'password',
  port: 5432,
})

const getAllArticles = (request, response) => {
    pool.query('SELECT * FROM article ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getArticle = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM article WHERE id=$1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createArticle = (request, response) => {
    const { title, description, author, tags } = request.body
  
    pool.query('INSERT INTO article (title, description, author, tags) VALUES ($1, $2, $3, $4)', [title, description, author, tags], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Article added with ID: ${results.insertId}`)
    })
  }

  const updateArticle = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, description, author, tags } = request.body
  
    pool.query(
      'UPDATE article SET title = $1, description = $2, author = $3, tags = $4 WHERE id = $5',
      [title, description, author, tags, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Article modified with ID: ${id}`)
      }
    )
  }

  const deleteArticle = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM article WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Article deleted with ID: ${id}`)
    })
  }

  module.exports = {
      getAllArticles,
      getArticle,
      createArticle,
      updateArticle,
      deleteArticle
  }