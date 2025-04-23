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
  Typography,
  Paper,
  Select,
  MenuItem
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import ConfirmDialog from '@/components/ConfirmDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

function AdminAdminManagement() {
  const title = 'Place Management';
  const http = new HttpClient();
  const router = useRouter();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [facilityopenDialog, setFacilityOpenDialog] = useState(false);
  const [foodopenDialog, setFoodOpenDialog] = useState(false);
  const [locationOpenDialog, setLocationOpenDialog] = useState(false);
  const [searchProvince, setSearchProvince] = useState('');
  const [selectId, setSelectId] = useState<string>('');
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
  const [food, setFood] = useState<any[]>([
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
  const getPlace = async () => {
    const res = await http.get(
      `AdminPlace?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );
    setDatasource(res.item);
    setTotalItem(res.total);
  };

  const onConfirm = async (id: string) => {
    await http.delete(`AdminPlace/${id}`);
    await getPlace();
  };

  {
    /* Facility Dialog */
  }
  const handleFacility = (e: any) => {
    setSelectId(e.id);
    setFacility(e.facilitys || []);
    setFacilityOpenDialog(true);
  };

  const onConfirmFacility = async (id: any) => {
    await http.delete(`AdminFacility/${id}`);
    setFacility((prevFacility) =>
      prevFacility.filter((facilityItem) => facilityItem.id !== id)
    );
    await getPlace();
  };

  const handleAddFacility = () => {
    const item = datasource.find((data) => data.id === selectId);
    router.push(`admin/facility/${item.id}`);
  };

  {
    /* Food Dialog */
  }
  const handleFood = (e: any) => {
    setSelectId(e.id);
    setFood(e.foods || []);
    setFoodOpenDialog(true);
  };

  const onConfirmFood = async (id: any) => {
    await http.delete(`AdminFood/${id}`);
    setFood((prevFood) => prevFood.filter((foodItem) => foodItem.id !== id));
    await getPlace();
  };

  const handleAddFood = () => {
    const item = datasource.find((data) => data.id === selectId);
    router.push(`admin/food/${item.id}`);
  };

  {
    /* Room Dialog */
  }
  const handleRoom = () => {
    const path = `/management/room/admin`;
    router.push(`${path}?refresh=true`);
  };
  {
    /* Location Dialog */
  }
  const handleLocation = (e: any) => {
    setSelectId(e.id);
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
    const item = datasource.find((data) => data.id === selectId);
    router.push(`admin/location/${item.id}`);
  };

  useEffect(() => {
    getPlace();
    const interval = setInterval(() => {
      getPlace();
    }, 1000);
    return () => clearInterval(interval);
  }, [pageNumber, pageSize, router.query.refresh]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Grid item sx={{ p: 3 }}>
        <Select
          value={searchProvince}
          onChange={(e) => setSearchProvince(e.target.value)}
          displayEmpty
          sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}
        >
          <MenuItem value="">All Provinces</MenuItem>
          {datasource &&
            [...new Set(datasource.map((item) => item.category))].map(
              (province, index) => (
                <MenuItem key={index} value={province}>
                  {province}
                </MenuItem>
              )
            )}
        </Select>
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
                    <Button href="admin/0" variant="contained">
                      Post
                    </Button>
                  </Box>
                }
                title={title}
              />
              <Divider />
              <TableContainer style={{ height: 'calc(92vh - 298px)' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Province</TableCell>
                      <TableCell>Room</TableCell>
                      <TableCell>Facility</TableCell>
                      <TableCell>Food</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasource
                      ?.filter((item) =>
                        searchProvince ? item.category === searchProvince : true
                      )
                      .map((item, index) => (
                        <TableRow hover key={item.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <Tooltip title="View Room" arrow>
                              <Button
                                color="primary"
                                size="small"
                                sx={{
                                  ml: '-8px',
                                  textAlign: 'left',
                                  justifyContent: 'flex-start'
                                }}
                                onClick={() => handleRoom()}
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
                                sx={{
                                  ml: '-3px',
                                  textAlign: 'left',
                                  justifyContent: 'flex-start'
                                }}
                                onClick={() => handleFacility(item)}
                              >
                                View
                              </Button>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="View Food" arrow>
                              <Button
                                color="primary"
                                size="small"
                                sx={{
                                  ml: '-8px',
                                  textAlign: 'left',
                                  justifyContent: 'flex-start'
                                }}
                                onClick={() => handleFood(item)}
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
                                onClick={() => handleLocation(item)}
                              >
                                View
                              </Button>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Edit Item" arrow>
                              <IconButton
                                href={`admin/${item.id}`}
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
        open={locationOpenDialog}
        onClose={() => setLocationOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>Location Details</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    padding: 2,
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    City
                  </Typography>
                  <Typography variant="body2">{location.city}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    padding: 2,
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    Address
                  </Typography>
                  <Typography variant="body2">{location.address}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddLocation} color="primary">
            Add
          </Button>
          <Button href={`admin/location/edit/${location.id}`} color="primary">
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
          <TableContainer
            component={Paper}
            sx={{ maxHeight: '400px', overflowY: 'auto' }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <b>Item</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facility.map((facilityItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{facilityItem.item}</TableCell>
                    <TableCell align="right">
                      <ConfirmDialog
                        message="Are you sure to delete this item?"
                        onConfirm={() => onConfirmFacility(facilityItem.id)}
                      >
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                      </ConfirmDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

      {/* Food Dialog */}
      <Dialog
        open={foodopenDialog}
        onClose={() => setFoodOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>Food Details</DialogTitle>
        <DialogContent>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: '400px', overflowY: 'auto' }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <b>Item</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {food.map((foodItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{foodItem.item}</TableCell>
                    <TableCell align="right">
                      <ConfirmDialog
                        message="Are you sure to delete this item?"
                        onConfirm={() => onConfirmFood(foodItem.id)}
                      >
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                      </ConfirmDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAddFood()} color="primary">
            Add
          </Button>
          <Button onClick={() => setFoodOpenDialog(false)} color="primary">
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
