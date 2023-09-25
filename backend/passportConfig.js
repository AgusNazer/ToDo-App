

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('./models/UserModel'); // Asegúrate de proporcionar la ruta correcta a tu modelo de usuario

//  passport.use(
//   new LocalStrategy((username, password, done) => {
//     User.findOne({ username }, (err, user) => {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: 'Usuario no encontrado' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Contraseña incorrecta' });
//       }
//       return done(null, user);
//     });
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// module.exports = passport;


// passportConfig.js

// const LocalStrategy = require('passport-local').Strategy;
// const User = require('./models/UserModel'); // Asegúrate de proporcionar la ruta correcta a tu modelo de usuario

// module.exports = (passport) => {
//   passport.use(
//     new LocalStrategy((username, password, done) => {
//       User.findOne({ username }, (err, user) => {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false, { message: 'Usuario no encontrado' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Contraseña incorrecta' });
//         }
//         return done(null, user);
//       });
//     })
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
//   });
// };


///nueva modificacion 24/9/2023

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const  User  = require('./models/UserModel');

module.exports = (passport) => {
  // Configura la estrategia de autenticación local
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username', // Nombre de campo para el nombre de usuario
        passwordField: 'password', // Nombre de campo para la contraseña
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
          }
          const isValidPassword = await user.isValidPassword(password);
          if (!isValidPassword) {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Configura la estrategia de autenticación JWT
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'tu_secreto_secreto',
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.userId);
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
