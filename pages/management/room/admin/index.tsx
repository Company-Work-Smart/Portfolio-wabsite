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
import { useRouter } from 'next/router';
import { datetimeDisplay } from '@/helpers/datetime';
import { PeopleRate } from '@/helpers/render';
import DeleteIcon from '@mui/icons-material/Delete';
import { renderStars } from '@/content/Widgets/Favorite/rating';

function RoomManagement() {
  const title = 'Room Management';
  const http = new HttpClient();
  const router = useRouter();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [availableopenDialog, setAvailableOpenDialog] = useState(false);
  const [amenityopenDialog, setAmenityOpenDialog] = useState(false);
  const [priceopenDialog, setPriceOpenDialog] = useState(false);
  const [imageopenDialog, setImageOpenDialog] = useState(false);
  const [selectId, setSelectId] = useState<string>('');
  const [searchPlace, setSearchPlace] = useState('');
  const [available, setAvailable] = useState<any>({
    id: '',
    checkIn: '',
    checkOut: '',
    status: ''
  });
  const [price, setPrice] = useState<any>({
    id: '',
    pricing: '',
    discount: '',
    taxes: ''
  });

  const [image, setImage] = useState<any[]>([
    {
      id: '',
      images: ''
    }
  ]);

  const [amenity, setAmenity] = useState<any[]>([
    {
      id: '',
      item: ''
    }
  ]);

  const handlePageChange = (_event: any, newPageNumber: number): void => {
    setPageNumber(newPageNumber);
    getRooms();
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageSize(parseInt(event.target.value));
    getRooms();
  };

  {
    /* Room Dialog */
  }
  const getRooms = async () => {
    const res = await http.get(
      `AdminRoom?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );
    setDatasource(res.item);
    setTotalItem(res.total);
  };

  const onConfirm = async (id: string) => {
    await http.delete(`AdminRoom/${id}`);
    await getRooms();
  };

  {
    /* available Dialog */
  }
  const handleViewavailable = (e: any) => {
    setSelectId(e.id);
    setAvailable({
      id: e.available?.id || '0',
      checkIn: e.available?.checkIn || '',
      checkOut: e.available?.checkOut || '',
      status: e.available?.status || ''
    });
    setAvailableOpenDialog(true);
  };

  const handleAddavailable = () => {
    const item = datasource.find((data) => data.id === selectId);
    router.push(`admin/available/${item.id}`);
  };

  {
    /* Price Dialog */
  }
  const handleViewPrice = (e: any) => {
    setSelectId(e.id);
    setPrice({
      id: e.price?.id || '0',
      pricing: e.price?.pricing || '0',
      discount: e.price?.discount || '0',
      taxes: e.price?.taxes || '0'
    });
    setPriceOpenDialog(true);
  };

  const handleAddPrice = () => {
    const item = datasource.find((data) => data.id === selectId);
    router.push(`admin/price/${item.id}`);
  };

  {
    /* Image Dialog */
  }
  const handleViewImage = (e: any) => {
    setSelectId(e.id);
    setImage(e.images || []);
    setImageOpenDialog(true);
  };

  const onConfirmImage = async (id: any) => {
    await http.delete(`AdminImage/${id}`);
    setImage((prevImage) =>
      prevImage.filter((imageItem) => imageItem.id !== id)
    );
    await getRooms();
  };

  const handleAddImage = () => {
    const item = datasource.find((data) => data.id === selectId);
    router.push(`admin/image/${item.id}`);
  };

  {
    /* Amenities Dialog */
  }
  const handleViewAmenity = (e: any) => {
    setSelectId(e.id);
    setAmenity(e.amenities || []);
    setAmenityOpenDialog(true);
  };

  const onConfirmAmenity = async (id: any) => {
    await http.delete(`AdminAmenities/${id}`);
    setAmenity((prevamenities) =>
      prevamenities.filter((amenitiesItem) => amenitiesItem.id !== id)
    );
    await getRooms();
  };

  const handleAddAmenity = () => {
    const item = datasource.find((data) => data.id === selectId);
    router.push(`admin/amenity/${item.id}`);
  };


  useEffect(() => {
    getRooms();
    const interval = setInterval(() => {
      getRooms();
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
          value={searchPlace}
          onChange={(e) => setSearchPlace(e.target.value)}
          displayEmpty
          sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}
        >
          <MenuItem value="">All Places</MenuItem>
          {datasource &&
            [...new Set(datasource.map((item) => item.place.name))].map(
              (name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
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
                      <TableCell>Name Place</TableCell>
                      <TableCell>Adult</TableCell>
                      <TableCell>Children</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Amenity</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Available</TableCell>
                      <TableCell>Rate</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasource
                      ?.filter((item) =>
                        searchPlace ? item.place.name === searchPlace : true
                      )
                      .map((item, index) => (
                        <TableRow hover key={item.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item?.place.name}</TableCell>
                          <TableCell>
                            {item.adult} {item.adult > 1 ? ' adults' : ' adult'}
                          </TableCell>
                          <TableCell>
                            {item.children}{' '}
                            {item.children > 1 ? ' childrens' : ' children'}
                          </TableCell>
                          <TableCell>{item.size} m²</TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              size="small"
                              sx={{
                                ml: '-10px',
                                textAlign: 'left',
                                justifyContent: 'flex-start'
                              }}
                              onClick={() => handleViewPrice(item)}
                            >
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              size="small"
                              sx={{
                                textAlign: 'left',
                                justifyContent: 'flex-start'
                              }}
                              onClick={() => handleViewAmenity(item)}
                            >
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              size="small"
                              sx={{
                                ml: '-7px',
                                textAlign: 'left',
                                justifyContent: 'flex-start'
                              }}
                              onClick={() => handleViewImage(item)}
                            >
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              size="small"
                              onClick={() => handleViewavailable(item)}
                            >
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1">
                              {item.rates && item.rates.length > 0
                                ? renderStars(
                                    item.rates.reduce(
                                      (id, rate) =>
                                        id + parseFloat(rate.rating),
                                      0
                                    ) / PeopleRate.number
                                  )
                                : renderStars(PeopleRate.default)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              href={`admin/${item.id}`}
                              color="primary"
                              size="small"
                            >
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                            <ConfirmDialog
                              message="Are you sure to delete this item?"
                              onConfirm={() => onConfirm(item.id)}
                            >
                              <IconButton color="error" size="small">
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </ConfirmDialog>
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

      {/* available Dialog */}
      <Dialog
        open={availableopenDialog}
        onClose={() => setAvailableOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          Available Details
        </DialogTitle>
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
                      Check-In
                    </Typography>
                    <Typography variant="body2">
                      {datetimeDisplay(available.checkIn)}
                    </Typography>
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
                      Check-Out
                    </Typography>
                    <Typography variant="body2">
                      {datetimeDisplay(available?.checkOut)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    padding: 1,
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 500,
                    margin: '0 auto'
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Status
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: available.status === 'Available' ? 'green' : 'red',
                      fontWeight: 'bold'
                    }}
                  >
                    {available.status}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAddavailable()} color="primary">
            Add
          </Button>
          <Button href={`admin/available/edit/${available.id}`} color="primary">
            Edit
          </Button>
          <Button onClick={() => setAvailableOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Price Dialog */}
      <Dialog
        open={priceopenDialog}
        onClose={() => setPriceOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>Price Details</DialogTitle>
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
                      Price
                    </Typography>
                    <Typography variant="body2">{price.pricing} $</Typography>
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
                      Discount
                    </Typography>
                    <Typography variant="body2">{price.discount} $</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    padding: 1,
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 500,
                    margin: '0 auto'
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Taxes
                  </Typography>
                  <Typography variant="body2">{price.taxes} $</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAddPrice()} color="primary">
            Add
          </Button>
          <Button href={`admin/price/edit/${price.id}`} color="primary">
            Edit
          </Button>
          <Button onClick={() => setPriceOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Dialog */}
      <Dialog
        open={imageopenDialog}
        onClose={() => setImageOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>Image Details</DialogTitle>
        <DialogContent>
          <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Grid container spacing={2}>
              {image.map((imageItem, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <ConfirmDialog
                    message="Are you sure to delete this item?"
                    onConfirm={() => onConfirmImage(imageItem.id)}
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
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      {imageItem.images ? (
                        <img
                          src={imageItem.images}
                          alt={`Image ${index}`}
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '4px'
                          }}
                        />
                      ) : (
                        <Typography variant="body2">No Image</Typography>
                      )}
                    </Box>
                  </ConfirmDialog>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAddImage()} color="primary">
            Add
          </Button>
          <Button onClick={() => setImageOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Amenity Dialog */}
      <Dialog
        open={amenityopenDialog}
        onClose={() => setAmenityOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>Amenity Details</DialogTitle>
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
                {amenity.map((AmenityItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{AmenityItem.item}</TableCell>
                    <TableCell align="right">
                      <ConfirmDialog
                        message="Are you sure to delete this item?"
                        onConfirm={() => onConfirmAmenity(AmenityItem.id)}
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
          <Button onClick={() => handleAddAmenity()} color="primary">
            Add
          </Button>
          <Button onClick={() => setAmenityOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

RoomManagement.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default RoomManagement;
