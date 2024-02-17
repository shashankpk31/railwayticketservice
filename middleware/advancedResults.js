const advancedResults = (model, populate) => async (req, res, next) => {
    try {
        const query = buildQuery(req.query);
        const results = await executeQuery(query, model, populate);
        const pagination = buildPagination(results.length, req.query.page, req.query.limit);

        res.advancedResults = {
            success: true,
            count: results.length,
            pagination,
            data: results,
        };

        next();
    } catch (error) {
        console.error('Error in advancedResults:', error);
    }
};

const buildQuery = (query) => {
    const filteredQuery = filterQueryFields(query);
    const parsedQuery = parseQueryOperators(filteredQuery);
    const queryObj = JSON.parse(parsedQuery);
    return model.find(queryObj);
};

const executeQuery = async (query, model, populate) => {
    query = applySelectFields(query, req.query.select);
    query = applySorting(query, req.query.sort);
    query = applyPagination(query, req.query.page, req.query.limit);
    query = applyPopulation(query, populate);
    return await query.exec();
};

const filterQueryFields = (query) => {
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete query[param]);
    return query;
};

const parseQueryOperators = (queryStr) => {
    return queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
};

const applySelectFields = (query, selectFields) => {
    if (selectFields) {
        const fields = selectFields.split(',').join(' ');
        return query.select(fields);
    }
    return query;
};

const applySorting = (query, sortBy) => {
    if (sortBy) {
        const sortFields = sortBy.split(',').join(' ');
        return query.sort(sortFields);
    }
    return query.sort('-createdAt');
};

const applyPagination = (query, page, limit) => {
    const startIndex = (page - 1) * limit;
    return query.skip(startIndex).limit(limit);
};

const applyPopulation = (query, populate) => {
    if (populate) {
        return query.populate(populate);
    }
    return query;
};

const buildPagination = (totalResults, page, limit) => {
    const pagination = {};
    if (totalResults > (page * limit)) {
        pagination.next = { page: page + 1, limit };
    }
    if (page > 1) {
        pagination.prev = { page: page - 1, limit };
    }
    return pagination;
}

module.exports = advancedResults;