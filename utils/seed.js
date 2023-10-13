const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }
    
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }
    const user1 = await User.create({ username: 'user1', email: 'user1@email.com' });
    const user2 = await User.create({ username: 'user2', email: 'user2@email.com' });

    const thought1 = await Thought.create({ thoughtText: 'thought 1', username: 'user1' });
    const thought2 = await Thought.create({ thoughtText: 'thought 2', username: 'user2' });

    const reaction1 = { reactionBody: 'reaction 1', username: 'user2' };
    const reaction2 = { reactionBody: 'reaction 2', username: 'user1' };

    thought1.reactions.push(reaction1);
    thought2.reactions.push(reaction2);

    user1.thoughts.push(thought1);
    user2.thoughts.push(thought2);

    await thought1.save();
    await thought2.save();
    await user1.save();
    await user2.save();
    connection.close();
});