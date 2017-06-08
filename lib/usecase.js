const replies = {
  simFound: {
    en: 'Alright, your sim card is going to be unlocked within a few minutes.',
    fr: 'Très bien, votre carte sim sera déverrouillée d\'ici quelques minutes.',
  },
  simNotFound: {
    en: 'Sorry, your puk code seems invalid, can you check again and send a valid one?',
    fr: 'Votre code puk semble invalide, pouvez le vérifier et le renvoyer?',
  },
  simMissing: {
    en: 'Alright, I need the PUK code in order to unlock your sim card.',
    fr: 'Très bien, il me faut votre code PUK pour déverrouiller votre carte sim.',
  },
  greetings: {
    en: 'Hello, how can I help you?',
    fr: 'Bonjour, comment puis-je vous aider?',
  },
  goodbye: {
    en: 'Goodbye',
    fr: 'Au revoir',
  },
  thanks: {
    en: 'You are welcome',
    fr: 'Je vous en prie',
  }
}

module.exports = {
  handledIntent: 'sim-card-problem',
  handledLanguages: ['en', 'fr'],
  floatingIntents: [
    'greetings',
    'goodbye',
    'thanks',
  ],
  getReply: (db, entities, conversations, userId) => new Promise(resolve => {
    if (entities.puk && entities.puk.length && 10000000 <= parseInt(entities.puk[0].value, 10) && parseInt(entities.puk[0].value, 10) <= 99999999) {
      if (entities.puk[0].value.toString()[0] % 2 == 0) {
        resolve({ type: 'text', content: replies.simFound[conversations[userId]] })

        if (conversations[userId]) {
          console.log("Delete language: " + conversations[userId] + " for id " + userId)
          delete conversations[userId]
        }
      } else {
        resolve({ type: 'text', content: replies.simNotFound[conversations[userId]] })
      }
    } else {
      resolve({ type: 'text', content: replies.simMissing[conversations[userId]] })
    }
  }),
  getFloatingReply: (intent, conversations, userId) => new Promise(resolve => {
    resolve({ type: 'text', content: replies[intent][conversations[userId]] })

    if (conversations[userId] && (intent == 'thanks' || intent == 'goodbye')) {
      console.log("Delete language: " + conversations[userId] + " for id " + userId)
      delete conversations[userId]
    }
  })
}
