# main.py
from openpyxl import Workbook
from sheet_utils.ss_a import build_ssa_sheet
from sheet_utils.ss_b import build_ssb_sheet
from sheet_utils.ss_c import build_ssc_sheet
from sheet_utils.ss_c1 import build_ssc1_sheet
from sheet_utils.ss_c2 import build_ssc2_sheet
from sheet_utils.ss_d import build_ssd_sheet
from sheet_utils.styles import (
    headingGreenfill,
    white_bold_font,
    bold_font,
    center_align,
    black_border
)
from openpyxl.styles import Alignment



def generate_excel(payload: dict) -> str:
    
    landData = payload["landData"]
    buildingData = payload["buildingData"]
    equipmentData = payload["equipmentData"]
    furnitureData=payload["furnitureData"]
    electricData=payload["electricData"]
    otherAssetsData=payload["otherAssetsData"]
    preOperativeExpenseData=payload["preOperativeExpenseData"]
    
    #sample data
    # ssc_data = [["Indigeneous",161.83], ["Imported", 327.9], ["Erection & Installation Charges 2%", 9.28]]
    # ssc1_data = [["Furniture & Fixtures",161.83]]
    # ssc2_data = [["Total service line charges", 5.55], ["Other Electrical fitting", 9.28]]
    # ssc2_data2 = [["Office equipments", 10.00]]
    # ssd_data = [["Other Expenses", 12.76], ["Lease Rent",1.43], ["Interest during construction period  (SS-D1)", 24.75], ["Bank Charges @0.50%", 2.02]]

    wb = Workbook()
    pc_sheet = wb.create_sheet("Project Cost")
    pc_sheet.column_dimensions["A"].width = 36

    maxRow = pc_sheet.max_row
    label = pc_sheet.cell(row=maxRow+1, column=1)
    label.value = "Statement"
    label.font = white_bold_font
    label.fill = headingGreenfill
    label.alignment = center_align

    maxRow = pc_sheet.max_row
    pc_sheet.merge_cells(start_row=maxRow, start_column=2, end_row=maxRow, end_column=4)
    label = pc_sheet.cell(row=maxRow, column=2)
    label.value = "Project Cost"
    label.font = white_bold_font
    label.fill = headingGreenfill
    label.alignment = center_align

    pc_sheet.append(["", "", "", "Rs Lakhs"])
    pc_sheet.cell(row=pc_sheet.max_row, column=4).font = bold_font
    pc_sheet.cell(row=pc_sheet.max_row, column=4).alignment = center_align
    pc_sheet.append([])

    landTotal = build_ssa_sheet(wb, landData)
    buildingTotal = build_ssb_sheet(wb, buildingData)
    equipmentTotal = build_ssc_sheet(wb, equipmentData["data"])
    furntireTotal = build_ssc1_sheet(wb, furnitureData["data"])
    electricTotal, otherAssetsTotal = build_ssc2_sheet(wb, electricData["data"], otherAssetsData["data"])
    preOperativeExpenseTotal = build_ssd_sheet(wb, preOperativeExpenseData["data"])
    pc_sheet.append(["Land", "SS-A","", landTotal])
    pc_sheet.append(["Building", "SS-B","", buildingTotal])
    pc_sheet.append(["Plant & Equipment", "SS-C","", equipmentTotal])
    pc_sheet.append(["Furniture & Fittings", "SS-C1","", furntireTotal])
    #ssc2_total, ssc3_total = build_ssc2_sheet(wb, electricTotal, otherAssetsTotal)
    pc_sheet.append(["Electrical Fittings", "SS-C2","", electricTotal])
    pc_sheet.append(["Other Fixed Assets", "SS-C3","", otherAssetsTotal])
    pc_sheet.append(["Preoperative expenses", "SS-D","", preOperativeExpenseTotal])

    for row in range(5, pc_sheet.max_row+1):
        pc_sheet.cell(row=row, column=2).font = bold_font
        pc_sheet.cell(row=row, column=2).alignment = center_align

    #term load computation table
    pc_sheet.append([])
    maxRow=pc_sheet.max_row
    pc_sheet.merge_cells(start_row=2, start_column=6, end_row=2, end_column=10)
    label = pc_sheet.cell(row=2, column=6)
    label.fill = headingGreenfill
    label.alignment = center_align
    label.font = white_bold_font
    label.value = "Term Loan Computation"

    pc_sheet.column_dimensions["F"].width = 28
    pc_sheet.column_dimensions["H"].width = 22
    pc_sheet.column_dimensions["J"].width = 10

    pc_sheet.row_dimensions[3].height = 32

    cell = pc_sheet.cell(row=3, column=8)
    cell.alignment = Alignment(
        wrap_text=True,
        horizontal='center',
        vertical='center'
    )
    cwr = 3 #current working row
    cwc = 6 #current working col
    termLoadHeaadings = ["", "Rs Lakhs", "% of Contribution to Margin Money", "", "Term Loan"]
    for i, heading in enumerate(termLoadHeaadings):
        cell = pc_sheet.cell(row=cwr, column=cwc, value=heading)
        cell.font = bold_font
        cwc+=1
    cwr+=1
    cwc=6


    #pc_sheet.append(["", "Rs Lakhs", "% Contribution to Margin Money", "", "Term Loan"])


    #applying border
    for row in pc_sheet.iter_rows(min_row=2, max_row=pc_sheet.max_row, min_col=1, max_col=4):
        for cell in row:
            cell.border = black_border
    for row in pc_sheet.iter_rows(min_row=14, max_row=pc_sheet.max_row, min_col=1, max_col=5):
        for cell in row:
            cell.border = black_border



    if 'Sheet' in wb.sheetnames:
        wb.remove(wb['Sheet'])

    output_path = "final_report.xlsx"
    wb.save(output_path)
    return output_path
