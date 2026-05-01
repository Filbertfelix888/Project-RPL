import { TabPanel } from '@mui/lab';
import { Typography, Box } from '@mui/material';
import useDashboardData from '../hooks/useDashboardData';

const DashboardPanel = ({ value }) => {
  const {
    totalTaskSummary,
    dueSoonTasksSummary,
    overdueTasksSummary,
    workloadSumarry,
  } = useDashboardData();
  return (
    <TabPanel
      value={value}
      sx={{
        paddingY: 3,
        paddingX: 0,
      }}
    >
      <Typography>Dashboard</Typography>
      <Box>
        {JSON.stringify({
            totalTaskSummary,
            dueSoonTasksSummary,
            overdueTasksSummary,
            workloadSumarry,
        })}
      </Box>
    </TabPanel>
  );
};

export default DashboardPanel;
