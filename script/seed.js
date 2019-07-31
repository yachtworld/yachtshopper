'use strict'

const db = require('../server/db')
const {User, Products} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', cart: [1, 2]}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Products.create({
      name: 'Atlantis',
      imgUrl:
        'http://static.callebaut.org/static/vca/images/vincent/projects/160220_hyperions/thumb/hyperions_pl000.jpg',
      price: 100000,
      location: 'the ocean',
      description: 'A ficitonal island mentioned by Plato'
    }),
    Products.create({
      name: 'Spectabilis',
      imgUrl:
        'https://www.privateislandsonline.com/uploads/resize/_1747_image_691ba69c7d.jpg-1074-822.jpg',
      price: 100000,
      location: 'Bahamas',
      description: '460 acre island'
    }),
    Products.create({
      name: 'Cave Cay',
      imgUrl:
        'https://www.privateislandsonline.com/uploads/resize/_909_image_eae61786dd.jpg-1074-822.jpg',
      price: 100000,
      location: 'Bahamas',
      description: '222 acre island'
    }),
    Products.create({
      name: 'Jewel Caye',
      imgUrl:
        'https://www.privateislandsonline.com/uploads/resize/_1462_5877e73d077f3.jpg-1360-1100.jpg',
      price: 10000000,
      location: 'Belize',
      description:
        'Lying in the azure waters of Belize’s Cockney Range, only 6.5 miles east of the Sittee River Bar mouth and Hopkins Village, Jewel Caye delivers two acres of tropical seascapes.'
    }),
    Products.create({
      name: 'Taveuni Island Resort',
      imgUrl:
        'https://www.privateislandsonline.com/uploads/resize/_2166_58a717b099569.jpg-1074-822.jpg',
      price: 10000000,
      location: 'Fiji',
      description:
        'A rare opportunity to acquire this renowned and fully established, award winning resort and spa. This premiere freehold island property is a unique offering beyond compare!'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
