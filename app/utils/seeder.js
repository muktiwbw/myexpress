const fs = require('fs');
const User = require('./../models/userModel');
const { catchAsync } = require('./query');
const { promisify } = require('util');

const seed = catchAsync(async () => {
  const usersSeed = JSON.parse(await promisify(fs.readFile)(`${__dirname}/../seeds/users.json`, { encoding: 'utf-8' }));
  // Add more...

  const users = await User.create(usersSeed);
  // Add more...

  Promise.all([ 
    users 
    // Add more...
  ]).then(() => {
    console.log('Database seeding is completed');
    process.exit();
  }).catch((err) => {
    console.log(err);
    process.exit(1);
  });
})

const scoop = catchAsync(async () => {
  const users = await User.deleteMany();
  // Add more...

  Promise.all([ 
    users
    // Add more..
   ]).then(() => {
    console.log('Database scooping is completed');
    process.exit();
  }).catch((err) => {
    console.log(err);
    process.exit();
  });
});

if (process.argv[2] === 'seed') {
  seed();
} else if (process.argv[2] === 'scoop') {
  scoop();
} else {
  console.log(`Invalid flag: ${process.argv[2]}`);
  process.exit();
}