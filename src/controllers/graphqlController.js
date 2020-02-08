const graphqlHTTP = require('koa-graphql');
const { buildSchema } = require('graphql');

const taskService = require('../services/taskService');
const graphqlService = require('../services/graphqlService');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    allUser: [User]
    allTask: [Task],
    allTaskForUser(userId: Int!): [Task],
  },
  type Mutation {
    saveTask(userId: Int!, taskName: String!, description: String!, isComplete: Boolean!): saveTaskResponse,
    deleteTask(id: Int!): DeleteTaskResponse
  },
  input tasktInput {
    userId: Int!,
    taskName: String!,
    description: String!, 
    isComplete: Boolean!
  },
  type saveTaskResponse {
    message: String!
  },
  type DeleteTaskResponse {
    message: String!
  },
  type User {
    id: Int!,
    username: String!,
    password: String!,
    createdate: String!,
    modifydate: String!,
    isdelete: Boolean!
  },
  type Task {
    id: Int!,
    taskname: String!,
    description: String!,
    createdate: String!,
    modifydate: String!,
    iscomplete: Boolean!,
    isdelete: Boolean!
  }
`);

const rootResolver = {
  allUser: graphqlService.getAllUser(),
  allTask: graphqlService.getAll(),
  allTaskForUser: graphqlInput => graphqlService.getAllTaskForUser(graphqlInput && graphqlInput.userId),
  saveTask: graphqlInput => graphqlService.save(graphqlInput),
  deleteTask: graphqlInput => graphqlService.deleteById(graphqlInput.id),
};

const graphql = graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true, // this creates the interactive GraphQL API explorer with documentation.
});

module.exports = graphql;