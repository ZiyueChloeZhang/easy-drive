import React, { useEffect, useState } from 'react'
import {
    Paper,
    Grid,
    makeStyles,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    InputAdornment,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'

import * as reviewService from './reviewService'
import Controls from './controls/Controls'
import useTable from './useTable'
import Popup from './Popup'
import ReviewForm from './ReviewForm'
import RatingStar from './RatingStar'

const useStyles = makeStyles((theme) => ({
    pageContent: {
        padding: theme.spacing(3),
    },
    searchInput: {
        width: '75%',
    },
    newButton: {
        position: 'absolute',
        right: '10px',
    },
}))

const headCells = [
    { id: 'fullName', label: 'Student Name' },
    // { id: 'email', label: 'Email Address (Personal)' },
    { id: 'rating', label: 'Rating' },
    { id: 'comment', label: 'Comment' },
    // { id: 'mobile', label: 'Mobile Number' },
    { id: 'classtype', label: 'Class Type' },
    { id: 'reviewDate', label: 'Time' },
    // { id: 'actions', label: 'Actions', disableSorting: true },
]

export default function Reviews({ instructorId }) {
    const classes = useStyles()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(reviewService.getAllReviews())
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items
        },
    })
    const [openPopup, setOpenPopup] = useState(false)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(records, headCells, filterFn)

    const handleSearch = (e) => {
        let target = e.target
        setFilterFn({
            fn: (items) => {
                if (target.value === '') return items
                else
                    return items.filter((x) =>
                        x.fullName
                            .toLowerCase()
                            .includes(target.value.toLowerCase()),
                    )
            },
        })
    }

    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0) reviewService.insertReview(employee)
        else reviewService.updateReview(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(reviewService.getAllReviews())
    }

    const openInPopup = (item) => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Reviews"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                    />
                    {/* <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Controls.Select
                                name="ratingId"
                                label="Rating"
                                // onChange={handleInputChange}
                                options={reviewService.getRatingCollection()}
                            />
                        </Grid>
                    </Grid> */}
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => {
                            setOpenPopup(true)
                            setRecordForEdit(null)
                        }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {recordsAfterPagingAndSorting().map((item) => (
                            <TableRow key={item.id}>
                                <TableCell width={200}>
                                    {item.fullName}
                                </TableCell>
                                {/* <TableCell>
										{item.email}
									</TableCell> */}
                                <TableCell width={150}>
                                    <RatingStar average={item.rating} />
                                </TableCell>
                                <TableCell width={300}>
                                    {item.comment}
                                </TableCell>
                                {/* <TableCell>
										{item.mobile}
									</TableCell> */}
                                <TableCell>{item.classtype}</TableCell>
                                <TableCell>{item.reviewDate}</TableCell>
                                {/* <TableCell>
										<Controls.ActionButton
											color='primary'
											onClick={() => {
												openInPopup(item);
											}}
										>
											<EditOutlinedIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton color='secondary'>
											<CloseIcon fontSize='small' />
										</Controls.ActionButton>
									</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ReviewForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
        </>
    )
}