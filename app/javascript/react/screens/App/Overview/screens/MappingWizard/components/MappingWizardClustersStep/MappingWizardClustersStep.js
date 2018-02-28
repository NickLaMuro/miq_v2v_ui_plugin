import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';

import ClustersStepForm from './components/ClustersStepForm';

class MappingWizardClustersStep extends React.Component {
  componentDidMount() {
    const {
      fetchSourceClustersUrl,
      fetchSourceClustersAction,
      fetchTargetClustersUrl,
      fetchTargetClustersAction
    } = this.props;

    fetchSourceClustersAction(fetchSourceClustersUrl);
    fetchTargetClustersAction(fetchTargetClustersUrl);
  }

  render() {
    const {
      isFetchingSourceClusters,
      sourceClusters,
      isFetchingTargetClusters,
      targetClusters
    } = this.props;

    return (
      <Field
        name="clusterMappings"
        component={ClustersStepForm}
        sourceClusters={sourceClusters}
        targetClusters={targetClusters}
        validate={[length({ min: 1 })]}
        isFetchingSourceClusters={isFetchingSourceClusters}
        isFetchingTargetClusters={isFetchingTargetClusters}
      />
    );
  }
}

MappingWizardClustersStep.propTypes = {
  fetchSourceClustersUrl: PropTypes.string,
  fetchSourceClustersAction: PropTypes.func,
  fetchTargetClustersUrl: PropTypes.string,
  fetchTargetClustersAction: PropTypes.func,
  sourceClusters: PropTypes.arrayOf(PropTypes.object),
  targetClusters: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceClusters: PropTypes.bool,
  isFetchingTargetClusters: PropTypes.bool
};
MappingWizardClustersStep.defaultProps = {
  fetchSourceClustersUrl: '',
  fetchSourceClustersAction: noop,
  fetchTargetClustersUrl: '',
  fetchTargetClustersAction: noop,
  isFetchingSourceClusters: true,
  isFetchingTargetClusters: true
};

export default reduxForm({
  form: 'mappingWizardClustersStep',
  initialValues: { clusterMappings: [] },
  destroyOnUnmount: false
})(MappingWizardClustersStep);
