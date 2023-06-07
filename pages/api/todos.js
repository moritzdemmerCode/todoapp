import connectToDatabase from '../../lib/db';

export default async function handler(req, res) {
    const { method } = req;
    const dbConnection = await connectToDatabase();
    const db = dbConnection.db;
    const todosCollection = db.collection('todos');

    switch (method) {
        case 'GET':
            const todos = await todosCollection.find({}).toArray();
            res.status(200).json(todos);
            break;

        case 'POST':
            const newTodo = req.body;
            await todosCollection.insertOne(newTodo);
            res.status(201).json(newTodo);
            break;

        case 'PUT':
            const { id, _id, ...updatedTodo } = req.body;
            await todosCollection.updateOne({ id }, { $set: updatedTodo });
            res.status(200).json(updatedTodo);
            break;

        case 'DELETE':
            const { todoId } = req.query;
            await todosCollection.deleteOne({ id: todoId });
            res.status(204).end();
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}