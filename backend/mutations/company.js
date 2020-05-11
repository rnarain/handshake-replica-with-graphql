const Company = require("../Models/CompanyModel");
const updateCompanyDetails = async (args) => {
    let company = await Company.findById(args.id);
    if (company) {
        company.name = args.name;
        company.description = args.description;
        company.city = args.city;
        company.email = args.email;
        company.phone = args.phone;
        let savedCompany = await company.save();
        if (savedCompany) {
            return { status: 200, message: "COMPANY_DETAILS_UPDATED" };
        }
        else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

exports.updateCompanyDetails = updateCompanyDetails;