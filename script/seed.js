'use strict'

const db = require('../server/db')
const {User, Products} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Cody',
      address: '1 Cody Lane',
      email: 'cody@email.com',
      password: '123',
      admin: true
    }),
    User.create({
      name: 'Murphy',
      address: '123 Cody Lane',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const products = await Promise.all([
    Products.create({
      name: 'Nautilus Ecoresort',
      imgUrl:
        'http://static.callebaut.org/static/vca/images/vincent/projects/170831_nautilusecoresort/thumb/new_pl000.jpg',
      price: 10000000,
      location: 'Palawan, Philippines',
      description:
        'A PLUS-ENERGY VILLAGE IN A DOUBLE GOLDEN SPIRAL ON STILTS. It is more fun in the Philippines!',
      coords: [9.9785077, 114.7194864]
    }),
    Products.create({
      name: 'Jelly Fish Island',
      imgUrl:
        'http://static.callebaut.org/static/vca/images/vincent/projects/151223_aequorea/thumb/aequorea_pl053.jpg',
      price: 20000000,
      location: 'Rio de Janeiro, Brazil',
      description: 'You better know how to swim. Or visit YachtWorld.',
      coords: [-22.9138851, -43.726166]
    }),
    Products.create({
      name: 'Atlantis',
      imgUrl:
        'http://static.callebaut.org/static/vca/images/vincent/projects/160220_hyperions/thumb/hyperions_pl000.jpg',
      price: 100000,
      location: 'the ocean',
      description: 'A ficitonal island mentioned by Plato',
      coords: [31.732739, -42.2566187]
    }),
    Products.create({
      name: 'Hydrogenase',
      imgUrl:
        'http://static.callebaut.org/static/vca/images/vincent/projects/100505_hydrogenase/thumb/hydrogenase_pl003.jpg',
      price: 700000,
      location: 'Shanghai, South China Sea',
      description:
        'Able to produce electricity and biofuel without emit CO2 or other polluting substances, the hydrogen especially is nowadays such as a very promising clean energy source. Therefore (its production that respects the environment and in sufficient quantity) is a study theme that interests the biggest scientific international groups. Actually, at the end of the 90s it has been discovered that the private sulphur micro-seaweeds go from the oxygen production (classical photosynthesis) to the hydrogen production. Such as a growing tree uses the solar radiance to manufacture organic material, we aim today at producing by photosynthesis some dihydrogen (i.e. gaseous hydrogen) from living micro-organisms as seaweeds from the « Chlamydomonas reinhardtii » family that owns enzyme of hydrogenase type.',
      coords: [31.2231339, 120.9163295]
    }),
    Products.create({
      name: 'Aequorea',
      imgUrl:
        'http://static.callebaut.org/static/vca/images/vincent/projects/151223_aequorea/thumb/aequorea_pl043.jpg',
      price: 20000000,
      location: 'Rio de Janeiro, Brazil',
      description:
        'We move around by ship or submarine, thanks to the algae fuel or hydrocarbons we produce free of greenhouse gas emissions. We make our biofuels by extracting hydrogen and carbon from seawater through osmotic pressure, then synthesizing them. This process allows us to also pump the carbon dioxide out of the oceans, thus neutralizing the acidification process that had been destroying our ecosystems such as the Great Barrier Reef.',
      coords: [-22.9138851, -43.726166]
    }),
    Products.create({
      name: 'Amillarah Private Island',
      imgUrl:
        'http://www.amillarah.com/bestanden/artikelen/2/125_amillarah-private-island-koen-olthuis-design-18.jpg?1427282120',
      price: 50000000,
      location: 'Norwegian Fjords',
      description: 'Plenty of room for any size yacht!',
      coords: [63.3542605, 1.1487358]
    }),
    Products.create({
      name: 'Laucala Island',
      imgUrl:
        'https://media.architecturaldigest.com/photos/574854c8fd7713654620505f/master/w_1600%2Cc_limit/private-islands-06.jpg',
      price: 800000,
      location: 'Fiji',
      description:
        'This 3,000-acre island in Fiji features a billion-dollar villa, with its own modern pool, a championship-level golf course and the largest swimming pool in the South Pacific (at over 53,000 square feet).',
      coords: [-16.5421852, 177.2178901]
    }),
    Products.create({
      name: 'Landscript Ecological Master Plan',
      imgUrl: 'https://www.itsliquid.com/wp-content/uploads/design/00117.jpg',
      price: 900000,
      location: 'Geneva, Switzerland',
      description:
        'Landscript proposes an evolution scenario on the fifteen next years which is based on a new auto cloning phenomenon of the landscape. Indeed, the concept of the project comes from the territorial genes in order to restore an equilibrated ecosystem between the built magma and a rediscovered biodiversity. The site, located in a alluvial plain and bordered by a moraine coming from the retreat of the glacier, lost all its territorial history. This is a good example of invasion of the landscape by the concrete cover of the industrial city. There is no more vegetation now inside the site! For more than 15 000 years, the site has been forged and modelled by the power of the water and the glacial moraine. The water, essential element of the Genevan landscape, does not irrigate anymore the territory in surface. Landsript proposes to restore these aquatic flows open-cast which interlace themselves between the viaducts of the Jeunes freeway. The lake’s contours are redrawn in order to welcome the historical project of the river harbour linked to the buckle of the railroad so as to create a true multimodal pole of entertainment in the centre of the city.',
      coords: [46.2050282, 6.126579]
    }),

    Products.create({
      name: 'Spectabilis',
      imgUrl:
        'https://www.privateislandsonline.com/uploads/resize/_1747_image_691ba69c7d.jpg-1074-822.jpg',
      price: 100000,
      location: 'Bahamas',
      description: '460 acre island',
      coords: [24.3681292, -80.4595158]
    }),
    Products.create({
      name: 'Cave Cay',
      imgUrl:
        'https://www.privateislandsonline.com/uploads/resize/_909_image_eae61786dd.jpg-1074-822.jpg',
      price: 100000,
      location: 'Bahamas',
      description: '222 acre island',
      coords: [24.3681292, -80.4595158]
    }),
    Products.create({
      name: 'Jewel Caye',
      imgUrl:
        'https://www.privateislandsonline.com/uploads/resize/_1462_5877e73d077f3.jpg-1360-1100.jpg',
      price: 10000000,
      location: 'Belize',
      description:
        'Lying in the azure waters of Belize’s Cockney Range, only 6.5 miles east of the Sittee River Bar mouth and Hopkins Village, Jewel Caye delivers two acres of tropical seascapes.',
      coords: [17.1876831, -89.4413335]
    }),
    Products.create({
      name: 'Taveuni Island Resort',
      imgUrl:
        'https://www.privateislandsonline.com/uploads/resize/_2166_58a717b099569.jpg-1074-822.jpg',
      price: 10000000,
      location: 'Fiji',
      description:
        'A rare opportunity to acquire this renowned and fully established, award winning resort and spa. This premiere freehold island property is a unique offering beyond compare!',
      coords: [-16.5421852, 177.2178901]
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} islands`)
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
