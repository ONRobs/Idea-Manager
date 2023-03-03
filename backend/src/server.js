const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('./src/db/database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
});

const app = express();
const port = 3004;

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());

database.serialize(() => {
// izveido Ideas tabulu
  database.run(`
    CREATE TABLE IF NOT EXISTS Ideas (
      Idea_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Idea TEXT NOT NULL,
      Description TEXT,
      Date_Created DATE DEFAULT CURRENT_DATE,
      Rating INTEGER DEFAULT 0
    );
  `);
// izveido Tags tabulu
  database.run(`
    CREATE TABLE IF NOT EXISTS Tags (
      Tag_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Tag TEXT NOT NULL UNIQUE
    );
  `);
// izveido Ideas_Tags tabulu
  database.run(`
    CREATE TABLE IF NOT EXISTS Ideas_Tags (
      Idea_ID INTEGER NOT NULL,
      Tag_ID INTEGER NOT NULL,
      PRIMARY KEY (Idea_ID, Tag_ID),
      FOREIGN KEY (Idea_ID) REFERENCES Ideas(Idea_ID),
      FOREIGN KEY (Tag_ID) REFERENCES Tags(Tag_ID)
    );
  `);
})

// POST route lai izveidotu jaunu Idea lauku Ideas tabulā
app.post('/ideas', (req, res) => {
  const idea = req.body.Idea;
  const description = req.body.Description;
  // noņem tag kuri atkārtojas
  const unsortedTags = req.body.Tag;
  const tags = [...new Set(unsortedTags)]

  // ideas tabulā ievieto idea un description laukus
  database.run('INSERT INTO Ideas (Idea, Description) VALUES (?, ?)', [idea, description], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    } else {
      const ideaID = this.lastID;
      tags.forEach(tag => {
        // meklē tag vērtību tags tabulā
        database.get('SELECT Tag_ID FROM Tags WHERE Tag = ?', [tag], function (err, row) {
          if (err) {
            console.error(err.message);
            res.status(500).send('Server error');
          } else {
            // ja tag eksistē, izmanto to kopā ar idea_id vērtību ideas_tags tabulā
            if (row) {
              const tagID = row.Tag_ID;
              database.run('INSERT OR IGNORE INTO Ideas_Tags (Idea_ID, Tag_ID) VALUES (?, ?)', [ideaID, tagID], function (err) {
                if (err) {
                  console.error(err.message);
                  res.status(500).send('Server error');
                }
              });
            // ja tag neeksistē tags tabulā, ievietot to
            } else {
              database.run('INSERT INTO Tags (Tag) VALUES (?)', [tag], function (err) {
                if (err) {
                  console.error(err.message);
                  res.status(500).send('Server error');
                // ievieto tag_id un ide_id tabulā
                } else {
                  const tagID = this.lastID;
                  database.run('INSERT INTO Ideas_Tags (Idea_ID, Tag_ID) VALUES (?, ?)', [ideaID, tagID], function (err) {
                    if (err) {
                      console.error(err.message);
                      res.status(500).send('Server error');
                    }
                  });
                }
              });
            }
          }
        });
      });
      res.status(200).send('Success');
    }
  });
});

// GET route lai atgrieztu Idea_ID, Idea, Description, Date_Created, Tag, kur Rating = 0
// kārtoti pēc datuma
app.get('/rate', (req, res) => {
  database.all(
    `SELECT Ideas.Idea_ID, Ideas.Idea, Ideas.Description, Ideas.Date_Created, Ideas.Rating,
    GROUP_CONCAT(Tags.Tag, ',') as Tags
    FROM Ideas
    LEFT JOIN Ideas_Tags ON Ideas.Idea_ID = Ideas_Tags.Idea_ID
    LEFT JOIN Tags ON Ideas_Tags.Tag_ID = Tags.Tag_ID
    WHERE Ideas.Rating = 0
    GROUP BY Ideas.Idea_ID
    ORDER BY Ideas.Date_Created ASC`,
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else {
        res.json(rows);
      }
    }
  );
});

// PUT route lai nomainītu rating lauku ideas tabulā
app.put('/rate/:id/rating', (req, res) => {
  const ideaID = req.params.id;
  const rating = req.body.Rating;

  database.run(
    `UPDATE Ideas SET Rating = ? WHERE Idea_ID = ?`,
    [rating, ideaID],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else if (this.changes === 0) {
        res.status(404).send('Idea not found');
      } else {
        res.send('Rating updated successfully');
      }
    }
  );
});

// GET route lai atgrieztu Idea_ID, Idea, Description, Date_Created, Rating, Tag
// kārtoti pēc datuma
app.get('/ideas', (req, res) => {
  database.all(
    `SELECT Ideas.Idea_ID, Ideas.Idea, Ideas.Description, Ideas.Date_Created, Ideas.Rating,
    GROUP_CONCAT(Tags.Tag, ',') as Tags
    FROM Ideas
    LEFT JOIN Ideas_Tags ON Ideas.Idea_ID = Ideas_Tags.Idea_ID
    LEFT JOIN Tags ON Ideas_Tags.Tag_ID = Tags.Tag_ID
    GROUP BY Ideas.Idea_ID
    ORDER BY Ideas.Date_Created ASC`,
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else {
        res.json(rows);
      }
    }
  );
});
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})