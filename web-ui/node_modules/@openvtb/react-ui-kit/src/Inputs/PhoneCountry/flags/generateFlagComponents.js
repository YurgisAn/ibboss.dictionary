const fs = require('fs');
const path = require('path');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function (filename) {
      fs.readFile(dirname + filename, 'utf-8', function (err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

function generateIndexImportFile() {
  let indexFileImportContent = '';
  readFiles(
    path.join(__dirname, '../../../Icons/flags/'),
    (filename) => {
      const iconComponentName = filename && filename.split('.')[0];
      indexFileImportContent += `\nexport {ReactComponent as ${iconComponentName}} from '../../../Icons/flags/${filename}'`;
    },
    console.error
  );

  setTimeout(
    () => fs.writeFileSync(path.join(__dirname, './index.ts'), indexFileImportContent),
    5000
  );
}

generateIndexImportFile();
