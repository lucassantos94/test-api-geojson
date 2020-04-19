import { app } from './shared/infra';

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`running on port ${port}`));
