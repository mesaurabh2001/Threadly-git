const dummyPosts = [
  {
    "communityId": 1,
    "userId": 101,
    "title": "Exploring the Mountains",
    "description": "A beautiful weekend hike through the mountains with incredible views and fresh air.",
    "images": {
      "dimension": "landscape",
      "images": [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1",
        "https://images.unsplash.com/photo-1486911278844-a81c5267e227",
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1",
        "https://images.unsplash.com/photo-1500534623283-312aade485b7"
      ]
    }
  },
  {
    "communityId": 2,
    "userId": 102,
    "title": "Morning Coffee Ritual",
    "description": "Starting the day slowly with a fresh cup of coffee and a quiet moment to myself.",
    "images": {
      "dimension": "portrait",
      "images": [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0",
        "https://images.unsplash.com/photo-1498804103079-a6351b050096"
      ]
    }
  },
  {
    "communityId": 1,
    "userId": 103,
    "title": "Sunset by the Ocean",
    "description": "Nothing beats watching the sun disappear over the horizon after a long day.",
    "images": {
      "dimension": "portrait",
      "images": [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        "https://images.unsplash.com/photo-1476673160081-cf065607f449",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        "https://images.unsplash.com/photo-1493552152660-f915ab47ae9d",
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57"
      ]
    }
  },
  {
    "communityId": 3,
    "userId": 104,
    "title": "A Walk in the Forest",
    "description": "Spent the afternoon walking through a peaceful forest surrounded by tall trees and nature.",
    "images": {
      "dimension": "landscape",
      "images": [
        "https://images.unsplash.com/photo-1448375240586-882707db888b",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
        "https://images.unsplash.com/photo-1473445361085-b9a07f55608b",
        "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1",
        "https://images.unsplash.com/photo-1511497584788-876760111969"
      ]
    }
  },
  {
    "communityId": 2,
    "userId": 105,
    "title": "City Lights at Night",
    "description": "The city feels completely different after dark, with streets full of lights and energy.",
    "images": {
      "dimension": "landscape",
      "images": [
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
        "https://images.unsplash.com/photo-1514565131-fce0801e5785",
        "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000"
      ]
    }
  },
  {
    "communityId": 4,
    "userId": 106,
    "title": "Healthy Breakfast Ideas",
    "description": "A simple and colorful breakfast packed with fresh fruits, grains, and plenty of energy.",
    "images": {
      "dimension": "portrait",
      "images": [
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
        "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7"
      ]
    }
  },
  {
    "communityId": 3,
    "userId": 107,
    "title": "Working from a Cozy Space",
    "description": "A productive work session in a cozy workspace with plenty of natural light.",
    "images": {
      "dimension": "landscape",
      "images": [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
        "https://images.unsplash.com/photo-1497366216548-37526070297c"
      ]
    }
  },
  {
    "communityId": 5,
    "userId": 108,
    "title": "Weekend Road Trip",
    "description": "Packed the essentials and headed out on an unforgettable road trip with friends.",
    "images": {
      "dimension": "landscape",
      "images": [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        "https://images.unsplash.com/photo-1474552226712-ac0f0961a954",
        "https://images.unsplash.com/photo-1494783367193-149034c05e8f",
        "https://images.unsplash.com/photo-1500534623283-312aade485b7"
      ]
    }
  },
  {
    "communityId": 4,
    "userId": 109,
    "title": "Reading in the Park",
    "description": "Found the perfect quiet spot in the park to spend an afternoon reading a good book.",
    "images": {
      "dimension": "portrait",
      "images": [
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
      ]
    }
  },
  {
    "communityId": 5,
    "userId": 110,
    "title": "Beautiful Winter Landscape",
    "description": "A peaceful winter morning surrounded by snow-covered trees and beautiful scenery.",
    "images": {
      "dimension": "landscape",
      "images": [
        "https://images.unsplash.com/photo-1483664852095-d6cc6870702d",
        "https://images.unsplash.com/photo-1511131341194-24e2eeeebb09",
        "https://images.unsplash.com/photo-1457269449834-928af64c684d",
        "https://images.unsplash.com/photo-1491002052546-bf38f186af56",
        "https://images.unsplash.com/photo-1548777123-e216912df7d8"
      ]
    }
  }
]

module.exports = dummyPosts;