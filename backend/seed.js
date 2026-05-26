const sequelize = require('./config/db');
const bcrypt = require('bcryptjs');
const { User } = require('./models');

const seed = async () => {
  await sequelize.sync({ force: true });
  const rootPassword = await bcrypt.hash('SecureRootPass101!', 10);
  await User.create({
    name: 'Platform Core Administrator System Account',
    email: 'admin@platform.com',
    password: rootPassword,
    address: 'System Infrastructure Headquarters Cluster Building A Suite 400',
    role: 'Admin'
  });
  console.log('Database clean structural rebuild complete. Seeded Admin Account user.');
  process.exit(0);
};
seed();
