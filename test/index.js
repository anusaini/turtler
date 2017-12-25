const test = require('tape');

const turtler = require('../index');

test('turtler', (t) => {
  t.plan(8);

  t.test('should throw on value that isn\'t an array of arrays', (t) => {
    try {
      turtler('hi');
      t.fail('should not be able to format strings');
    } catch(ex) {
      t.equal(ex.message, 'data should be an array of arrays');
      t.end();
    }
  });

  t.test('should throw on value that isn\'t an array of arrays', (t) => {
    try {
      turtler([['hi'], 'nope nope nope']);
      t.fail('should not be able to format strings as row values');
    } catch(ex) {
      t.equal(ex.message, 'data should be an array of arrays');
      t.end();
    }
  });

  t.test('should throw on column values that are not strings', (t) => {
    try {
      turtler([['hi'], [{ hi: 'world' }]]);
      t.fail('should not be able to format objects as column values');
    } catch(ex) {
      t.equal(ex.message, 'column values should be strings');
      t.end();
    }
  });

  t.test('should be able to format simple arrays', (t) => {
    try {
      let table = turtler([
        ["uid", "name"],
        ["1", "Doe"],
        ["2", "Hemma"]
      ]);
      t.equal(table.ascii, 'uid | name \n===========\n1   | Doe  \n2   | Hemma\n');
      t.equal(table.markdown, '|uid|name|\n|-|-|\n|1|Doe|\n|2|Hemma|\n');
      t.end();
    } catch(ex) {
      t.fail(ex);
    }
  });

  t.test('should be able to override the header and column separators', (t) => {
    try {
      let table = turtler([
        ["uid", "name"],
        ["1", "Doe"],
        ["2", "Hemma"]
      ], {
        headerSeparator: '',
        columnSeparator: ' '
      });
      t.equal(table.ascii, 'uid name \n1   Doe  \n2   Hemma\n');
      t.equal(table.markdown, '|uid|name|\n|-|-|\n|1|Doe|\n|2|Hemma|\n');
      t.end();
    } catch(ex) {
      t.fail(ex);
    }
  });

  t.test('should be able to state that there is no header', (t) => {
    try {
      let table = turtler([
        ["1", "Doe"],
        ["2", "Hemma"]
      ], {
        hasHeader: false,
        columnSeparator: ' '
      });
      t.equal(table.ascii, '1 Doe  \n2 Hemma\n');
      t.equal(table.markdown, '| | |\n|-|-|\n|1|Doe|\n|2|Hemma|\n');
      t.end();
    } catch(ex) {
      t.fail(ex);
    }
  });
  t.test('should be able to state that there is no header separator', (t) => {
    try {
      let table = turtler([
        ["uid", "name"],
        ["1", "Doe"],
        ["2", "Hemma"]
      ], {
        hasHeader: true,
        columnSeparator: ' '
      });
      t.equal(table.markdown, '|uid|name|\n|-|-|\n|1|Doe|\n|2|Hemma|\n');
      t.end();
    } catch(ex) {
      t.fail(ex);
    }
  });

  t.throws((t) => {
      turtler([
        ["uid", "name"],
        ["1", "Doe"],
        ["2", "Hemma", "Errorneous input"]
      ]);
      t.end();
  }, 'should throw error for mismatching column length');
});
