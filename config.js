module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.POSTGRESQL || 'postgres://orocodigo:$$0r0c0d1g0$$@localhost:5432/oroticket',
  secretToken: process.env.SECRET_TOKEN || '$$0r0c0d1g0$$'
}
