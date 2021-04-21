const express = require ('express');
const app = express();
const port = 3001;

// app.use('/api', apiRoutes);

app.use(express.static(__dirname + '/build'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html')
});

app.listen(port, () => console.log(`runnin in port ${port}`));