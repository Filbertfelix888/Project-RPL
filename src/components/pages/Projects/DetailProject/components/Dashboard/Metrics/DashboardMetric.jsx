import { Box, Card, CardContent, Stack, Tooltip, Typography } from "@mui/material";
import datetime from '@/utils/datetime';

const TaskTooltipContent = ({ tasks }) => {
    if (!tasks || tasks.length === 0) return <Typography variant="caption">Tidak ada tugas</Typography>;

    const shown = tasks.slice(0, 10);
    const remaining = tasks.length - shown.length;

    return (
        <Box>
            {shown.map((task, i) => (
                <Box key={task.public_id || i} mb={0.5}>
                    <Typography variant="caption" display="block" fontWeight="bold">
                        {task.title || 'Tanpa judul'}
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
                        {task.due_date && task.due_date !== '0001-01-01T00:00:00Z'
                            ? datetime.format(task.due_date, 'DD MMM YYYY')
                            : 'Tidak ada deadline'}
                    </Typography>
                </Box>
            ))}
            {remaining > 0 && (
                <Typography variant="caption">...dan {remaining} tugas lainnya</Typography>
            )}
        </Box>
    );
};

const DashboardMetric = ({
    title,
    value,
    icon: IconComponent,
    color,
    tasks = []
}) => {
    return (
        <Card sx={{
            minWidth: 275,
            width: '100%',
            bgcolor: color,
            color: 'white'
        }}>
            <CardContent>
                <Typography variant="subtitle2" gutterBottom sx={{opacity: 0.8}}>{title}</Typography>
                <Stack justifyContent={'space-between'} alignItems={'center'}>
                    <Tooltip
                        title={<TaskTooltipContent tasks={tasks} />}
                        arrow
                        placement="bottom"
                        componentsProps={{
                            tooltip: { sx: { maxWidth: 280, p: 1.5 } }
                        }}
                    >
                        <Typography
                            variant="h3"
                            component={'div'}
                            fontWeight={'bold'}
                            sx={{ cursor: 'default' }}
                        >
                            {value}
                        </Typography>
                    </Tooltip>
                    {
                        IconComponent && (
                            <IconComponent sx={{fontSize: 40, opacity: 0.7}} />
                        )
                    }
                </Stack>
            </CardContent>
        </Card>
    );
};

export default DashboardMetric;
