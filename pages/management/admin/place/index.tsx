import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useRouter } from 'next/router';

function AdminAdminManagement() {
  const title = 'Admin Management';
  const http = new HttpClient();
  const router = useRouter();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [facilityopenDialog, setFacilityOpenDialog] = useState(false);
  const [locationopenDialog, setLocationOpenDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [location, setLocation] = useState<any>({
    id: '',
    address: '',
    city: '',
    latitude: '',
    longitude: ''
  });
  const [facility, setFacility] = useState<any[]>([
    {
      id: '',
      item: ''
    }
  ]);

  const handlePageChange = (_event: any, newPageNumber: number): void => {
    setPageNumber(newPageNumber);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageSize(parseInt(event.target.value));
  };

  {
    /* place Dialog */
  }
  const getItems = async () => {
    setDatasource(null);
    const res = await http.get(
      `AdminPlace?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );
    setDatasource(res);
    setTotalItem(res.totalItem);
  };

  const onConfirm = async (id: string) => {
    await http.delete(`AdminPlace/${id}`);
    getItems();
  };

  {
    /* Facility Dialog */
  }
  const handleViewFacility = (e: any) => {
    setSelectedItemId(e.id);
    setFacility(e.facilitys || []);
    setFacilityOpenDialog(true);
  };

  const onConfirmFacility = async (id: any) => {
    await http.delete(`AdminFacility/${id}`);
    setFacility((prevFacility) =>
      prevFacility.filter((facilityItem) => facilityItem.id !== id)
    );
  };

  const handleAddFacility = () => {
    const item = datasource.find((data) => data.id === selectedItemId);
    router.push(`place/facility/${item.id}`);
  };

  {
    /* Room Dialog */
  }
  const handleViewRoom = () => {
    const path = `/management/room/admin`;
    router.push(`${path}?refresh=true`);
  };
  {
    /* Location Dialog */
  }
  const handleViewLocation = (e: any) => {
    setSelectedItemId(e.id);
    setLocation({
      id: e.location?.id || '0',
      address: e.location?.address || 'N/A',
      city: e.location?.city || 'N/A',
      latitude: e.location?.latitude || 'N/A',
      longitude: e.location?.longitude || 'N/A'
    });
    setLocationOpenDialog(true);
  };

  const handleAddLocation = () => {
    const item = datasource.find((data) => data.id === selectedItemId);
    router.push(`place/location/${item.id}`);
  };

  useEffect(() => {
    getItems();
  }, [pageNumber, pageSize, router.query.refresh]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Grid item sx={{ p: 3 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card style={{ position: 'relative' }}>
              {!datasource && (
                <LinearProgress
                  style={{ position: 'absolute', width: '100%' }}
                />
              )}
              <CardHeader
                action={
                  <Box>
                    <Button href="place/0" variant="contained">
                      Post
                    </Button>
                  </Box>
                }
                title={title}
              />
              <Divider />
              <TableContainer style={{ height: 'calc(100vh - 298px)' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Room</TableCell>
                      <TableCell>Facility</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasource?.map((item, index) => (
                      <TableRow hover key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <Tooltip title="View Room" arrow>
                            <Button
                              color="primary"
                              size="small"
                              style={{ marginLeft: '-13px' }}
                              onClick={() => handleViewRoom()}
                            >
                              View
                            </Button>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View Facility" arrow>
                            <Button
                              color="primary"
                              size="small"
                              style={{ marginLeft: '-5px' }}
                              onClick={() => handleViewFacility(item)}
                            >
                              View
                            </Button>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View Location" arrow>
                            <Button
                              color="primary"
                              size="small"
                              onClick={() => handleViewLocation(item)}
                            >
                              View
                            </Button>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Edit Item" arrow>
                            <IconButton
                              href={`place/${item.id}`}
                              color="primary"
                              size="small"
                            >
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Item" arrow>
                            <span>
                              <ConfirmDialog
                                message="Are you sure to delete this item?"
                                onConfirm={() => onConfirm(item.id)}
                              >
                                <IconButton color="error" size="small">
                                  <DeleteTwoToneIcon fontSize="small" />
                                </IconButton>
                              </ConfirmDialog>
                            </span>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box p={2}>
                <TablePagination
                  component="div"
                  count={totalItem}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={pageNumber}
                  rowsPerPage={pageSize}
                  rowsPerPageOptions={Pagination.pageSizeOptions}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Location Dialog */}
      <Dialog
        open={locationopenDialog}
        onClose={() => setLocationOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>Location Details</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: 500
                  }}
                >
                  <Box
                    sx={{
                      padding: 2,
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '48%'
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      City
                    </Typography>
                    <Typography variant="body2">{location.city}</Typography>
                  </Box>
                  <Box
                    sx={{
                      padding: 2,
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '48%'
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Address
                    </Typography>
                    <Typography variant="body2">{location.address}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAddLocation()} color="primary">
            Add
          </Button>
          <Button href={`place/location/edit/${location.id}`} color="primary">
            Edit
          </Button>
          <Button onClick={() => setLocationOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Facility Dialog */}
      <Dialog
        open={facilityopenDialog}
        onClose={() => setFacilityOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>Facility Details</DialogTitle>
        <DialogContent>
          <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Grid container spacing={2}>
              {facility.map((facilityItem, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <ConfirmDialog
                    message="Are you sure to delete this item?"
                    onConfirm={() => onConfirmFacility(facilityItem.id)}
                  >
                    <Box
                      sx={{
                        padding: 1,
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {facilityItem.item}
                      </Typography>
                    </Box>
                  </ConfirmDialog>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAddFacility()} color="primary">
            Add
          </Button>
          <Button onClick={() => setFacilityOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AdminAdminManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default AdminAdminManagement;
