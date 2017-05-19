const replies = {
  simFound: {
    en: 'Alright, your sim card will be unlocked within a few minutes.',
    fr: 'Très bien, votre carte sim sera déverouillée d\'ici quelques minutes.',
  },
  simNotFound: {
    en: 'Sorry, your puk code seems invalid, can you check again and send a valid one?',
    fr: 'Votre code puk semble invalide, pouvez le vérifier et le renvoyer?',
  },
  simMissing: {
    en: 'Alright, I need the PUK code in order to unlock your sim card.',
    fr: 'Très bien, il me faut votre code PUK pour déverouiller votre carte sim.',
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
  getReply: (db, entities, language) => new Promise(resolve => {
    const puk = (entities.puk || [])[0] || null
    if (puk) {
      const simcard = db.find(entry => entry.puk.toString() === puk.value)
      if (simcard) {
        resolve({ type: 'text', content: replies.simFound[language] })
      }
      resolve({ type: 'text', content: replies.simNotFound[language] })
    }
    resolve({ type: 'text', content: replies.simMissing[language] })
  }),
  getFloatingReply: (intent, language) => new Promise(resolve => {
    resolve({ type: 'text', content: replies[intent][language] })
  })
}
