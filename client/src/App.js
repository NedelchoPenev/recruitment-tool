import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar';
import JobDetailsContainer from './components/job-details/job-details.container';
import JobsPage from './pages/jobs.page';
import CreateJobContainer from './components/create-edit-job/create-job.container';
import EditJobContainer from './components/create-edit-job/edit-job.container';
import CandidatesPage from './pages/candidates.page';
import AddCandidateContainer from './components/add-edit-candidate/add-candidate.container';
import EditCandidateContainer from './components/add-edit-candidate/edit-candidate.container';
import CreateInterviewContainer from './components/create-edit-interview/create-interview.container';
import InterviewPage from './pages/interviews.page';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path={['/jobs/all', '/']} component={JobsPage} />
        <Route exact path='/jobs/create' component={CreateJobContainer} />
        <Route exact path='/jobs/edit/:id' component={EditJobContainer} />
        <Route exact path='/job/details/:id' component={JobDetailsContainer} />
        <Route exact path='/candidates/all' component={CandidatesPage} />
        <Route exact path='/candidates/add' component={AddCandidateContainer} />
        <Route exact path='/candidates/edit/:id' component={EditCandidateContainer} />
        <Route exact path='/interview/create/:jobId/:candidateId' component={CreateInterviewContainer} />
        <Route exact path='/interviews/all' component={InterviewPage} />
      </Switch>
    </Router >
  );
}

export default App;
